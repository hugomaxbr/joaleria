import { ConflictException } from '@nestjs/common';
import { genSalt, hash } from 'bcrypt';
import { EntityRepository, Repository } from 'typeorm';
import { AuthCredentialsDto } from './dto/authCredentialsDto';
import { CreateUserDto } from './dto/createUserDto';
import { User } from './entities/user.entity';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  findByEmail(email: string): Promise<User> {
    return this.findOne({ email });
  }

  async deleteById(user: User): Promise<void> {
    await this.remove(user);
  }

  async findById(id: string): Promise<User> {
    return this.findOne(id, { relations: ['profile'] });
  }

  async listAllUsers(): Promise<User[]> {
    return this.find({ relations: ['profile'] });
  }

  async createUserAdmin(createUserDto: CreateUserDto): Promise<void> {
    const user = Object.assign(new User(), createUserDto);

    user.salt = await genSalt();
    user.password = await this.hashPassword(createUserDto.password, user.salt);

    await this.save(user);
  }

  async SignUp(createUserDto: CreateUserDto): Promise<void> {
    const { email, password, cpf, birth_date, name } = createUserDto;

    const user = new User();

    user.name = name;
    user.cpf = cpf;
    user.birth_date = birth_date;
    user.email = email;
    user.salt = await genSalt();
    user.password = await this.hashPassword(password, user.salt);

    const found = await this.findOne({ email: user.email });

    if (found) {
      throw new ConflictException('Email already registered');
    }

    await this.save(user);
  }

  private async hashPassword(password: string, salt: string): Promise<string> {
    return hash(password, salt);
  }

  async validateUserPassword(
    authCredentialsDto: AuthCredentialsDto,
  ): Promise<string> {
    const { email, password } = authCredentialsDto;
    const user = await this.findOne({ email });

    if (user && (await user.validatePassword(password))) {
      return user.email;
    } else {
      return null;
    }
  }
}
