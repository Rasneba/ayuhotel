import { drizzle, type NodePgDatabase } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

const databaseUrl = process.env.DATABASE_URL;

const globalForDb = globalThis as typeof globalThis & {
  __arenaNextJsPostgresqlPool?: Pool;
  __arenaNextJsPostgresqlDb?: NodePgDatabase;
};

function connect(): NodePgDatabase {
  if (!databaseUrl) {
    throw new Error(
      "DATABASE_URL is not set — the site will serve its bundled content until a database is configured.",
    );
  }
  const pool =
    globalForDb.__arenaNextJsPostgresqlPool ??
    new Pool({
      connectionString: databaseUrl,
    });

  if (process.env.NODE_ENV !== "production") {
    globalForDb.__arenaNextJsPostgresqlPool = pool;
  }

  return drizzle(pool);
}

/**
 * Lazy database handle.
 *
 * The pool is created on first use rather than at import time, so pages that
 * have bundled fallback content still render when no database is configured
 * (for example in a preview environment). Queries then reject and the caller's
 * `catch` path takes over.
 */
export const db = new Proxy({} as NodePgDatabase, {
  get(_target, property) {
    const target = globalForDb.__arenaNextJsPostgresqlDb ?? (globalForDb.__arenaNextJsPostgresqlDb = connect());
    const value = Reflect.get(target as object, property);
    return typeof value === "function" ? value.bind(target) : value;
  },
});
