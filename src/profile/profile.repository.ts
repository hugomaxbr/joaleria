import { EntityRepository, Repository } from 'typeorm';
import { CreateProfileDto } from './dto/createProfileDto';
import { Profile } from './entities/profile.entity';

@EntityRepository(Profile)
export class ProfileRepository extends Repository<Profile> {
  async createProfile(createProfileDto: CreateProfileDto): Promise<void> {
    const profile = Object.assign(new Profile(), createProfileDto);

    await this.save(profile);
  }

  async listAll(): Promise<Profile[]> {
    return this.find();
  }
}
