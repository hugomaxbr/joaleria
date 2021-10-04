import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductRepository } from 'src/product/product.repository';
import { StorageController } from './storage.controller';
import { StorageRepository } from './storage.repository';
import { StorageService } from './storage.service';

@Module({
  imports: [TypeOrmModule.forFeature([StorageRepository, ProductRepository])],
  controllers: [StorageController],
  providers: [StorageService],
})
export class StorageModule {}
