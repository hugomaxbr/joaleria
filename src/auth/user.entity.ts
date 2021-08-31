import bcrypt from "bcrypt";
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";
import { v4 as uuidV4 } from "uuid";
import { AccessLevel } from "./access_level/access_level.entity";
import { Profile } from "./profile/profile.entity";

@Entity()
class User {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @OneToOne(() => Profile)
  @JoinColumn({ name: "profile_id" })
  profile: Profile;

  @Column()
  profile_id: string;

  @OneToOne(() => AccessLevel)
  @JoinColumn({ name: "access_level_id" })
  access_level: AccessLevel;

  @Column()
  access_level_id: string;

  @Column()
  birth_date: Date;

  @Column()
  cpf: string;

  @Column()
  password: string;

  @Column()
  email: string;

  @UpdateDateColumn()
  updated_at: Date;

  @CreateDateColumn()
  created_at: Date;

  @Column()
  salt: string;

  constructor() {
    if (!this.id) {
      this.id = uuidV4();
    }
  }

  async validatePassword(password: string): Promise<Boolean> {
    const hash = await bcrypt.hash(password, this.salt);
    return hash === this.password;
  }
}

export { User };
