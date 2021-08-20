import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import * as bcrypt from 'bcrypt';


@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  name: string;

  @Column()
  password: string;

  @Column()
  salt : string;

  async validatePassword(password : string) : Promise<Boolean> {
    const hash = bcrypt.hash(password, this.salt);
    return hash === this.password;
  }
}
