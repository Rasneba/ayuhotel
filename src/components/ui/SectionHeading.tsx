import Reveal from "./Reveal";

type Props = {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  tone?: "light" | "dark";
  className?: string;
};

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  tone = "light",
  className = "",
}: Props) {
  const centered = align === "center";
  const titleColor = tone === "dark" ? "text-cream-50" : "text-ink-900";
  const descColor = tone === "dark" ? "text-cream-200/70" : "text-ink-500";

  return (
    <Reveal className={`${centered ? "mx-auto text-center" : ""} max-w-3xl ${className}`}>
      <span className={`eyebrow ${centered ? "eyebrow-center justify-center" : ""}`}>{eyebrow}</span>
      <h2 className={`display-lg mt-5 ${titleColor}`}>{title}</h2>
      {description ? (
        <p className={`mt-5 text-[15px] leading-relaxed sm:text-base ${descColor}`}>{description}</p>
      ) : null}
    </Reveal>
  );
}
