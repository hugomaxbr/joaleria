import { ConflictException } from "@nestjs/common";
import { genSalt, hash } from "bcrypt";
import { EntityRepository, Repository } from "typeorm";
import { Profile } from "./entities/profile.entity";
import { CreateProfileDto } from "./dto/createProfileDto";

@EntityRepository(Profile)
export class ProfileRepository extends Repository<Profile> {
  async createProfile(createProfileDto: CreateProfileDto): Promise<void> {
    const profile = Object.assign(new Profile(), createProfileDto);

    await this.save(profile);
  }
}
