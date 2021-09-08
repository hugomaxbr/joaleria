import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { genSalt, hash } from 'bcrypt';
import { ProfileRepository } from 'src/profile/profile.repository';
import { CreateUserDto } from './dto/createUserDto';
import { ListUserByIdDto } from './dto/listUserByIdDto';
import { UpdateUserDto } from './dto/updateUserDto';
import { User } from './entities/user.entity';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,

    @InjectRepository(ProfileRepository)
    private profileRepository: ProfileRepository,
  ) {}

  private async hashPassword(password: string, salt: string): Promise<string> {
    return hash(password, salt);
  }

  async create(createUserDto: CreateUserDto): Promise<void> {
    const userFound = await this.userRepository.findByEmail(
      createUserDto.email,
    );

    if (userFound) {
      throw new ConflictException('Email already registered');
    }

    const user = Object.assign(new User(), createUserDto);

    user.salt = await genSalt();
    user.password = await this.hashPassword(createUserDto.password, user.salt);

    this.userRepository.createUserAdmin(user);
  }

  async list(): Promise<User[]> {
    return this.userRepository.listAllUsers();
  }

  async findOne(listUserByIdDto: ListUserByIdDto): Promise<User> {
    return this.userRepository.findById(listUserByIdDto.id);
  }

  async delete(deleteUserById: ListUserByIdDto): Promise<void> {
    const user = await this.userRepository.findById(deleteUserById.id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    await this.userRepository.deleteById(user);
  }

  async update(
    updateUserDto: UpdateUserDto,
    listUserByIdDto: ListUserByIdDto,
  ): Promise<void> {
    const user = await this.userRepository.findById(listUserByIdDto.id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const profile = await this.profileRepository.findOneProfile(
      updateUserDto.profile_id,
    );

    if (!profile) {
      throw new NotFoundException('Profile not found');
    }

    // if (updateUserDto.password) {
    //   if (updateUserDto.password !== updateUserDto.confirm_password) {
    //     throw new NotFoundException('Password do not match');
    //   }
    //   updateUserDto.confirm_password = undefined;

    //   const salt = await genSalt();
    //   updateUserDto.password = await this.hashPassword(
    //     updateUserDto.password,
    //     salt,
    //   );
    // }

    const updatedUser = Object.assign(user, updateUserDto);
    delete updatedUser.profile;
    delete updatedUser.updated_at;
    console.log(updatedUser);

    await this.userRepository.updateUser(updatedUser);
  }
}
