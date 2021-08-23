import { EntityRepository, Repository } from 'typeorm';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';
import { AuthCredentialsDto } from './dto/authCredentialsDto';
import { CreateUserDto } from './dto/CreateUserDto';
import { ConflictException } from '@nestjs/common';
import { response } from 'express';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
    async SignUp(createUserDto : CreateUserDto): Promise<void> {
        const {email, password, cpf, birth_date, name} = createUserDto;

        const user = new User();
       
        user.name = name;
        user.cpf = cpf;
        user.birth_date= birth_date;
        user.email = email;
        user.salt = await bcrypt.genSalt();
        user.password = await this.hashPassword(password, user.salt);

        try {
            const found = await this.findOne({email : user.email})
            if(!found)
                await user.save();
        } catch (error) {
            throw new ConflictException('Email already registered');
        }
    }


    private async hashPassword(
        password: string,
        salt: string
    ): Promise<string> {
        return bcrypt.hash(password, salt);
    }

    async validateUserPassword(
        authCredentialsDto: AuthCredentialsDto
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
