import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateUserDto } from "./dto/createUserDto";
import { UserRepository } from "./user.repository";

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository
  ) {}

  async signUp(createUserDto: CreateUserDto): Promise<void> {
    return this.userRepository.SignUp(createUserDto);
  }
}
