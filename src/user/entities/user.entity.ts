import bcrypt from 'bcrypt';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { v4 as uuidV4 } from 'uuid';
import { Exclude } from 'class-transformer';
import { Role } from '../enums/role.enum';

@Entity('users')
class User {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  role: Role;

  @Column()
  birth_date: Date;

  @Column()
  cpf: string;

  @Column()
  @Exclude()
  password: string;

  @Column()
  email: string;

  @UpdateDateColumn()
  updated_at: Date;

  @CreateDateColumn()
  created_at: Date;

  @Column()
  @Exclude()
  salt: string;

  constructor() {
    if (!this.id) {
      this.id = uuidV4();
    }
  }

  async validatePassword(password: string): Promise<boolean> {
    const hash = await bcrypt.hash(password, this.salt);
    return hash === this.password;
  }
}

export { User };
