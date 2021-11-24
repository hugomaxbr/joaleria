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
    return this.findOne(id);
  }

  async listAllUsers(): Promise<User[]> {
    return this.find();
  }

  async createUserAdmin(user: User): Promise<void> {
    await this.save(user);
  }

  async updateUser(updateUserDto: User): Promise<void> {
    await this.update(updateUserDto.id, updateUserDto);
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
    user.role = 1;

    const found = await this.findOne({ email: user.email });

    if (found) {
      throw new ConflictException('Email já está cadastrado');
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

  insertProfilePic(fileName: string, user: User) {
    user.avatar_url = fileName;
    return this.save(user);
  }

  async countUsers(): Promise<number> {
    return this.count();
  }
}
