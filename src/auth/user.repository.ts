import { EntityRepository, Repository } from 'typeorm';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
    async SignUp(email: string, password: string, username: string): Promise<void> {

        const user = new User();
        user.name = username;
        user.email = email;
        user.salt = await bcrypt.genSalt();
        user.password = await this.hashPassword(password, user.salt);;

        try {
            await user.save();
        } catch (error) {
            const err = error.code; // Adicionar o error code nos logs de uma tabela no MongoDB
            if (error.code === '23505') {
                // duplicate username
                throw new Error('Username already exists');
            }
        }
    }


    private async hashPassword(
        password: string,
        salt: string
    ): Promise<string> {
        return bcrypt.hash(password, salt);
    }


}
