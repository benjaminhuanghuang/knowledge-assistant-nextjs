import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "postgresql",
  schema: "./lib/db/schema.ts",
  out: "./drizzle",
  dbCredentials: {
    // Session pooler (port 5432) — required for DDL during migrations.
    // Runtime app code uses DATABASE_URL (transaction pooler) instead.
    url: process.env.DIRECT_URL!,
  },
});
