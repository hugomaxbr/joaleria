import { TypeOrmModuleOptions } from "@nestjs/typeorm";

export default {
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "docker",
  database: "estagio",
  autoLoadEntities: true,
  synchronize: false,
  logging: true,
  migrations: ["./src/shared/typeorm/migrations/*.ts"],
  cli: {
    migrationsDir: "src/shared/typeorm/migrations",
  },
} as TypeOrmModuleOptions;
