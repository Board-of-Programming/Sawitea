import { pgTable, text, timestamp, decimal, boolean, integer, pgEnum } from "drizzle-orm/pg-core";
import { user } from "./auth";

// Enums
export const donationStatusEnum = pgEnum("donation_status", [
  "pending",
  "processing",
  "completed",
  "failed",
  "expired",
  "cancelled",
]);

// Streamer profile table
export const streamer = pgTable("streamer", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  username: text("username").notNull().unique(),
  displayName: text("display_name").notNull(),
  bio: text("bio"),
  avatar: text("avatar"),
  coverImage: text("cover_image"),
  isActive: boolean("is_active").notNull().default(true),
  // OBS Settings
  obsOverlayTheme: text("obs_overlay_theme").default("default"),
  obsOverlayDuration: integer("obs_overlay_duration").default(10),
  obsSoundEnabled: boolean("obs_sound_enabled").default(true),
  obsMinAmountShow: decimal("obs_min_amount_show", { precision: 12, scale: 2 }).default("10000"),
  // Mayar.id Integration
  mayarApiKey: text("mayar_api_key"),
  mayarMode: text("mayar_mode").default("sandbox"),
  // Stats
  totalDonations: decimal("total_donations", { precision: 12, scale: 2 }).default("0"),
  totalDonors: integer("total_donors").default(0),
  createdAt: timestamp("created_at", { mode: "date" }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { mode: "date" }).notNull().defaultNow(),
});

// Donations table
export const donation = pgTable("donation", {
  id: text("id").primaryKey(),
  streamerId: text("streamer_id")
    .notNull()
    .references(() => streamer.id, { onDelete: "cascade" }),
  // Donor info
  donorName: text("donor_name").notNull(),
  donorEmail: text("donor_email").notNull(),
  donorMessage: text("donor_message"),
  isAnonymous: boolean("is_anonymous").notNull().default(false),
  // Payment info (simplified - no fee breakdown)
  amount: decimal("amount", { precision: 12, scale: 2 }).notNull(),
  // Mayar.id fields
  mayarTransactionId: text("mayar_transaction_id"),
  mayarPaymentUrl: text("mayar_payment_url"),
  mayarPaymentMethod: text("mayar_payment_method"),
  // Status
  status: donationStatusEnum("status").notNull().default("pending"),
  paidAt: timestamp("paid_at", { mode: "date" }),
  expiredAt: timestamp("expired_at", { mode: "date" }),
  // OBS display
  isDisplayed: boolean("is_displayed").notNull().default(false),
  displayedAt: timestamp("displayed_at", { mode: "date" }),
  // Timestamps
  createdAt: timestamp("created_at", { mode: "date" }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { mode: "date" }).notNull().defaultNow(),
});

// Types
export type Streamer = typeof streamer.$inferSelect;
export type NewStreamer = typeof streamer.$inferInsert;

export type Donation = typeof donation.$inferSelect;
export type NewDonation = typeof donation.$inferInsert;
