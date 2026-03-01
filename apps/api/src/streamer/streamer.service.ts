import { Injectable, Inject, NotFoundException } from "@nestjs/common";
import { eq, desc } from "drizzle-orm";
import { DRIZZLE } from "../database";
import type { DrizzleDB } from "../database";
import { streamer, donation } from "@sawitea/database/schema";
import { CreateStreamerDto } from "./dto/create-streamer.dto";
import { randomUUID } from "crypto";

@Injectable()
export class StreamerService {
  constructor(@Inject(DRIZZLE) private readonly db: DrizzleDB) {}

  async create(userId: string, createStreamerDto: CreateStreamerDto) {
    const newStreamer = await this.db.insert(streamer).values({
      id: randomUUID(),
      userId,
      username: createStreamerDto.username,
      displayName: createStreamerDto.displayName,
      bio: createStreamerDto.bio || null,
      avatar: createStreamerDto.avatar || null,
      coverImage: createStreamerDto.coverImage || null,
    }).returning();

    return newStreamer[0];
  }

  async findByUsername(username: string) {
    const streamerData = await this.db.query.streamer.findFirst({
      where: eq(streamer.username, username),
    });

    if (!streamerData) {
      throw new NotFoundException("Streamer not found");
    }

    return streamerData;
  }

  async findByUserId(userId: string) {
    return this.db.query.streamer.findFirst({
      where: eq(streamer.userId, userId),
    });
  }

  async getProfile(username: string) {
    const streamerData = await this.findByUsername(username);

    // Get recent donations
    const recentDonations = await this.db.query.donation.findMany({
      where: eq(donation.streamerId, streamerData.id),
      orderBy: desc(donation.createdAt),
      limit: 10,
    });

    return {
      ...streamerData,
      recentDonations,
    };
  }

  async updateSettings(userId: string, settings: any) {
    const streamerData = await this.findByUserId(userId);

    if (!streamerData) {
      throw new NotFoundException("Streamer profile not found");
    }

    const updated = await this.db.update(streamer)
      .set({
        ...settings,
        updatedAt: new Date(),
      })
      .where(eq(streamer.id, streamerData.id))
      .returning();

    return updated[0];
  }
}
