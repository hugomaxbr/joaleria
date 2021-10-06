import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Storage } from '../storage/entities/storage.entity';
import { Product } from '../product/entities/product.entity';
import { User } from '../user/entities/user.entity';

export default {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'docker',
  database: 'estagio',
  entities: [User, Product, Storage],
  synchronize: false,
  logging: true,
  migrations: [__dirname + '/migrations/**/*.ts'],
  cli: {
    migrationsDir: './src/config/migrations',
  },
} as TypeOrmModuleOptions;
