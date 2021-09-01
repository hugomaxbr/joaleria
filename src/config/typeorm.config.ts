import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { Profile } from "src/profile/entities/profile.entity";
import { User } from "src/user/entities/user.entity";

export default {
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "docker",
  database: "estagio",
  entities: [User, Profile],
  synchronize: false,
  logging: true,
  cli: {
    migrationsDir: "migrations",
  },
} as TypeOrmModuleOptions;
