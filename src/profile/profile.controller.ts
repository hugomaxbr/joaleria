import { Controller, Post, Body, ValidationPipe } from "@nestjs/common";
import { ProfileService } from "./profile.service";
import { CreateProfileDto } from "./dto/createProfileDto";

@Controller("profiles")
export class ProfileController {
  constructor(private profileService: ProfileService) {}

  @Post()
  async createProfile(
    @Body(ValidationPipe) createProfileDto: CreateProfileDto
  ): Promise<void> {
    await this.profileService.create(createProfileDto);
  }
}
