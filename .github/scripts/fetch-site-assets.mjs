/**
 * One-off asset collector for ayuinternationhotel.netlify.app
 *
 * Runs on a GitHub Actions runner (which has full network access), crawls the
 * hotel's live site, and writes:
 *   - .assets-manifest/html/*.html  raw page markup (for copy + data mining)
 *   - .assets-manifest/manifest.json  url -> local path map
 *   - .assets-manifest/images/**     every image asset the site references
 *
 * A human then reviews the images and promotes the genuine hotel photography
 * into public/images/.
 */
import { mkdir, writeFile, readFile } from "node:fs/promises";
import path from "node:path";

const SITE = "https://ayuinternationhotel.netlify.app";
const OUT = process.cwd();
const MANIFEST_DIR = path.join(OUT, ".assets-manifest");
const IMG_DIR = path.join(MANIFEST_DIR, "images");
const HTML_DIR = path.join(MANIFEST_DIR, "html");

const EXTRA_SOURCES = [
  // Independent directory listing with photos of the same property.
  "https://hulunem.com/place/ethiopia/oromia/adama/ayu-international-hotel/",
];

const SKIP_HOSTS = [
  "maps.googleapis.com",
  "maps.google.com",
  "www.google.com",
  "google-analytics.com",
  "googletagmanager.com",
  "fonts.gstatic.com",
  "www.gstatic.com",
  "facebook.com",
  "connect.facebook.net",
];

const extOf = (url) => {
  const clean = url.split("?")[0].split("#")[0];
  const base = clean.substring(clean.lastIndexOf("/") + 1);
  const m = base.match(/\.(jpe?g|png|gif|webp|avif|svg)$/i);
  return m ? m[1].toLowerCase() : null;
};

const safeName = (url) => {
  const u = new URL(url);
  const clean = decodeURIComponent(u.pathname);
  const base = clean.substring(clean.lastIndexOf("/") + 1) || "index";
  let name = base.replace(/[^a-zA-Z0-9._-]/g, "-").replace(/-+/g, "-");
  if (!/\.(jpe?g|png|gif|webp|avif|svg)$/i.test(name) && extOf(url)) {
    name = `${name.replace(/\.$/, "")}.${extOf(url)}`;
  }
  // Theme CDN URLs are content hashed: keep a short prefix so names stay unique.
  if (u.hostname.endsWith("cloudfront.net")) {
    const hash = u.pathname.split("/").filter(Boolean);
    const shortHash = (hash[hash.length - 2] ?? hash[0] ?? "").slice(0, 8);
    if (shortHash && !name.includes(shortHash)) name = `${shortHash}-${name}`;
  }
  return name;
};

const collectUrls = (html, pageUrl) => {
  const found = new Set();
  const push = (raw) => {
    if (!raw) return;
    let candidate = raw.trim().replace(/^["'(]|["')]$/g, "");
    if (!candidate || candidate.startsWith("data:")) return;
    try {
      const abs = new URL(candidate, pageUrl).toString();
      found.add(abs);
    } catch {}
  };

  for (const m of html.matchAll(/(?:src|href|data-src|data-lazy-src|content)\s*=\s*["']([^"']+)["']/gi)) push(m[1]);
  for (const m of html.matchAll(/srcset\s*=\s*["']([^"']+)["']/gi)) {
    for (const part of m[1].split(",")) push(part.trim().split(/\s+/)[0]);
  }
  for (const m of html.matchAll(/url\(\s*([^)]+?)\s*\)/gi)) push(m[1].replace(/["']/g, ""));
  for (const m of html.matchAll(/["'](https?:\/\/[^"']+\.(?:jpe?g|png|gif|webp|avif|svg))["']/gi)) push(m[1]);
  return [...found];
};

const fetchText = async (url) => {
  const res = await fetch(url, {
    redirect: "follow",
    headers: { "user-agent": "Mozilla/5.0 (compatible; AyuAssetBot/1.0)" },
  });
  if (!res.ok) throw new Error(`${res.status} ${url}`);
  return { body: await res.text(), contentType: res.headers.get("content-type") ?? "", finalUrl: res.url };
};

const download = async (url, destRel) => {
  const res = await fetch(url, {
    redirect: "follow",
    headers: { "user-agent": "Mozilla/5.0 (compatible; AyuAssetBot/1.0)" },
  });
  if (!res.ok) throw new Error(`${res.status}`);
  const buf = Buffer.from(await res.arrayBuffer());
  const dest = path.join(OUT, destRel);
  await mkdir(path.dirname(dest), { recursive: true });
  await writeFile(dest, buf);
  return { bytes: buf.length, contentType: res.headers.get("content-type") ?? "" };
};

const main = async () => {
  await mkdir(IMG_DIR, { recursive: true });
  await mkdir(HTML_DIR, { recursive: true });

  const manifest = { site: SITE, generatedAt: new Date().toISOString(), pages: [], images: [], errors: [] };
  const seenPages = new Set();
  const queue = [SITE + "/"];
  const imageJobs = new Map(); // url -> destRel

  while (queue.length) {
    const pageUrl = queue.shift();
    if (seenPages.has(pageUrl) || seenPages.size > 40) continue;
    seenPages.add(pageUrl);

    let html, contentType;
    try {
      ({ body: html, contentType } = await fetchText(pageUrl));
    } catch (err) {
      manifest.errors.push({ pageUrl, error: String(err) });
      continue;
    }
    if (!contentType.includes("html")) continue;

    const slug = new URL(pageUrl).pathname.replace(/[^a-zA-Z0-9]+/g, "-").replace(/^-|-$/g, "") || "home";
    const htmlRel = path.join(".assets-manifest", "html", `${slug}.html`);
    await writeFile(path.join(OUT, htmlRel), html);
    manifest.pages.push({ url: pageUrl, html: htmlRel, title: (html.match(/<title[^>]*>([^<]*)</i) ?? [, ""])[1].trim() });

    for (const url of collectUrls(html, pageUrl)) {
      const u = new URL(url);
      if (SKIP_HOSTS.some((h) => u.hostname.endsWith(h))) continue;
      const ext = extOf(url);
      const sameHost = u.hostname.endsWith("ayuinternationhotel.netlify.app") || u.hostname.endsWith("netlify.app");
      const isThemeCdn = u.hostname.endsWith("cloudfront.net");
      if (!ext) {
        if (sameHost && !seenPages.has(url) && queue.length < 60) queue.push(url);
        continue;
      }
      if (!sameHost && !isThemeCdn) continue;
      const destRel = path.join(".assets-manifest", "images", safeName(url));
      if (!imageJobs.has(url)) imageJobs.set(url, destRel);
    }
  }

  // Photos of the same property hosted on independent listings.
  for (const src of EXTRA_SOURCES) {
    try {
      const { body: html } = await fetchText(src);
      const slug = new URL(src).hostname.replace(/[^a-z0-9]+/gi, "-");
      await writeFile(path.join(HTML_DIR, `${slug}.html`), html);
      manifest.pages.push({ url: src, html: path.join(".assets-manifest", "html", `${slug}.html`) });
      for (const url of collectUrls(html, src)) {
        const u = new URL(url);
        if (u.hostname.endsWith("hulunem.com") && extOf(url) && /\.(jpe?g|png|webp)$/i.test(url)) {
          const destRel = path.join(".assets-manifest", "images", `ext-${safeName(url)}`);
          if (!imageJobs.has(url)) imageJobs.set(url, destRel);
        }
      }
    } catch (err) {
      manifest.errors.push({ pageUrl: src, error: String(err) });
    }
  }

  for (const [url, destRel] of imageJobs) {
    try {
      const info = await download(url, destRel);
      manifest.images.push({ url, file: destRel, ...info });
    } catch (err) {
      manifest.errors.push({ url, error: String(err) });
    }
  }

  await writeFile(path.join(MANIFEST_DIR, "manifest.json"), JSON.stringify(manifest, null, 2));
  console.log(`pages=${manifest.pages.length} images=${manifest.images.length} errors=${manifest.errors.length}`);
};

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
