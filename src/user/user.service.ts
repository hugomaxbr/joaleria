import {
  Injectable,
  ConflictException,
  NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserRepository } from "./user.repository";
import { CreateUserDto } from "./dto/createUserDto";
import { User } from "./entities/user.entity";
import { ListUserByIdDto } from "./dto/listUserByIdDto";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository
  ) {}

  async create(createUserDto: CreateUserDto): Promise<void> {
    const userFound = await this.userRepository.findByEmail(
      createUserDto.email
    );

    if (userFound) {
      throw new ConflictException("Email already registered");
    }

    this.userRepository.createUserAdmin(createUserDto);
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
      throw new NotFoundException("User not found");
    }

    await this.userRepository.deleteById(user);
  }
}
