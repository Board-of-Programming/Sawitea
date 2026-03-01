import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "../packages/database/src/schema/*",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL || "postgres://localhost:5432/sawitea",
  },
});
