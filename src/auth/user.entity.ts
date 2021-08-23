import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import * as bcrypt from 'bcrypt';


@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  birth_date : Date; 

  @Column()
  cpf: string;

  @Column()
  password: string;

  @Column()
  email: string;

  @UpdateDateColumn({type : 'timestamptz'})
  updated_at : Date;
  
  @CreateDateColumn({type : "timestamptz"})
  created_at : Date;

 
  @Column()
  salt : string;

  async validatePassword(password : string) : Promise<Boolean> {
    const hash = bcrypt.hash(password, this.salt);
    return hash === this.password;
  }
}
