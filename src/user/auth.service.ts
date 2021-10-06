import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { jwt } from 'src/config';
import { AuthCredentialsDto } from './dto/authCredentialsDto';
import { CreateUserDto } from './dto/createUserDto';
import { responseSignInDto } from './interface/responseSignInDto';
import { UserRepository } from './user.repository';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
  ) {}

  async signUp(createUserDto: CreateUserDto): Promise<void> {
    return this.userRepository.SignUp(createUserDto);
  }

  async authenticateUser(
    authCredentialsDTO: AuthCredentialsDto,
  ): Promise<responseSignInDto> {
    const { email, password } = authCredentialsDTO;

    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new UnauthorizedException('Invalid Credentials');
    }

    const passwdMatched = await compare(password, user.password);

    if (!passwdMatched) {
      throw new UnauthorizedException('Invalid Credentials');
    }

    const { secret, expiresIn } = jwt;

    const token = sign({}, secret, {
      subject: String(user.id),
      expiresIn,
    });

    return {
      name: user.name,
      token,
    };
  }
}
