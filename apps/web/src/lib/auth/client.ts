import { createAuthClient } from "better-auth/react";

// Create Better Auth client
// The client will communicate with the NestJS backend
export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001",
});

// Export convenient methods
export const {
  signIn,
  signUp,
  signOut,
  useSession,
  getSession,
} = authClient;

// Export the client for advanced usage
export default authClient;
