import { betterAuth } from "better-auth";
import { Pool } from "pg";

// Create PostgreSQL connection pool for Better Auth
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// Better Auth configuration with PostgreSQL
export const auth = betterAuth({
  // PostgreSQL Database configuration
  database: {
    db: pool,
    type: "postgres",
  },

  // Email/Password authentication
  emailAndPassword: {
    enabled: true,
    autoSignIn: true,
  },

  // Social providers (optional)
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    },
    github: {
      clientId: process.env.GITHUB_CLIENT_ID || "",
      clientSecret: process.env.GITHUB_CLIENT_SECRET || "",
    },
  },

  // Session configuration
  session: {
    expiresIn: 60 * 60 * 24 * 7, // 7 days
  },

  // Advanced options
  advanced: {
    crossSubDomainCookies: {
      enabled: false,
    },
    generateId: false, // Use database default id generation
  },
});

export type Auth = typeof auth;
