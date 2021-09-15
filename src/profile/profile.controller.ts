import {
  Controller,
  Post,
  Body,
  ValidationPipe,
  Get,
  ClassSerializerInterceptor,
  UseInterceptors,
} from '@nestjs/common';
import { ProfileService } from './profile.service';
import { CreateProfileDto } from './dto/createProfileDto';
import { Profile } from './entities/profile.entity';

@Controller('profiles')
@UseInterceptors(ClassSerializerInterceptor)
export class ProfileController {
  constructor(private profileService: ProfileService) {}

  @Post()
  async createProfile(
    @Body(ValidationPipe) createProfileDto: CreateProfileDto,
  ): Promise<void> {
    await this.profileService.create(createProfileDto);
  }

  @Get()
  async listProfiles(): Promise<Profile[]> {
    return this.profileService.list();
  }
}
