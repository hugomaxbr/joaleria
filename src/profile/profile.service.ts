import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ProfileRepository } from "./profile.repository";
import { CreateProfileDto } from "./dto/createProfileDto";

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(ProfileRepository)
    private profileRepository: ProfileRepository
  ) {}

  async create(createProfileDto: CreateProfileDto): Promise<void> {
    this.profileRepository.createProfile(createProfileDto);
  }
}
