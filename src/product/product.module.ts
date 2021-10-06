import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductRepository } from './product.repository';
import { UploadModule } from 'src/upload/upload.module';

@Module({
  imports: [TypeOrmModule.forFeature([ProductRepository]), UploadModule],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
