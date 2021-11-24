import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import typeOrmConfig from './config/typeorm.config';
import { ProductModule } from './product/product.module';
import { ReportModule } from './reports/reports.module';
import { StorageModule } from './storage/storage.module';
import { UploadModule } from './upload/upload.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    UserModule,
    ProductModule,
    UploadModule,
    ReportModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'temp', 'images'),
    }),
    StorageModule,
  ],
})
export class AppModule {}
