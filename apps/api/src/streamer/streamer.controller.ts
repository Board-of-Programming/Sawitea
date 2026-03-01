import { Controller, Get, Post, Body, Param, Put, Session } from "@nestjs/common";
import { AllowAnonymous, UserSession } from "@thallesp/nestjs-better-auth";
import { StreamerService } from "./streamer.service";
import { CreateStreamerDto } from "./dto/create-streamer.dto";

@Controller("streamer")
export class StreamerController {
  constructor(private readonly streamerService: StreamerService) {}

  @Post()
  async create(
    @Session() session: UserSession,
    @Body() createStreamerDto: CreateStreamerDto,
  ) {
    return this.streamerService.create(session.user.id, createStreamerDto);
  }

  @Get("profile/:username")
  @AllowAnonymous()
  async getProfile(@Param("username") username: string) {
    return this.streamerService.getProfile(username);
  }

  @Get("me")
  async getMyProfile(@Session() session: UserSession) {
    const profile = await this.streamerService.findByUserId(session.user.id);
    if (!profile) {
      return null;
    }
    return this.streamerService.getProfile(profile.username);
  }

  @Put("settings")
  async updateSettings(
    @Session() session: UserSession,
    @Body() settings: any,
  ) {
    return this.streamerService.updateSettings(session.user.id, settings);
  }
}
