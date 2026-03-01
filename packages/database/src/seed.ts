// Database seeder for initial data
// Run with: npx ts-node src/seed.ts

import { db } from "./db";

async function seed() {
  console.log("Seeding database...");

  // Note: Payment fees are now handled by Mayar.id
  // No need to seed payment methods anymore

  console.log("Seeding completed!");
  console.log("Note: Payment processing is handled by Mayar.id");
}

seed().catch(console.error);
