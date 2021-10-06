import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { genSalt, hash } from 'bcrypt';
import { CreateUserDto } from './dto/createUserDto';
import { ListUserByIdDto } from './dto/listUserByIdDto';
import { UpdateUserDto } from './dto/updateUserDto';
import { User } from './entities/user.entity';
import { UserRepository } from './user.repository';
import { LocalService } from '../upload/local.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    private localService: LocalService,
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

    const updatedUser = Object.assign(user, updateUserDto);
    delete updatedUser.updated_at;

    await this.userRepository.updateUser(updatedUser);
  }

  async insertProfilePic(avatar: Express.Multer.File, id: string) {
    const user = await this.userRepository.findOne({ id });

    if (!user) {
      throw new NotFoundException('User does not exist');
    }

    const fileName = await this.localService.uploadFile(avatar, id);

    return this.userRepository.insertProfilePic(fileName, user);
  }
}
