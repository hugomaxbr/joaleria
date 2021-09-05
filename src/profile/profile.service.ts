import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProfileRepository } from './profile.repository';
import { CreateProfileDto } from './dto/createProfileDto';
import { Profile } from './entities/profile.entity';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(ProfileRepository)
    private profileRepository: ProfileRepository,
  ) {}

  async create(createProfileDto: CreateProfileDto): Promise<void> {
    this.profileRepository.createProfile(createProfileDto);
  }

  async list(): Promise<Profile[]> {
    return this.profileRepository.listAll();
  }
}
