import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductRepository } from 'src/product/product.repository';
import { StorageRepository } from 'src/storage/storage.repository';
import { UserRepository } from '../user/user.repository';
import { ReportsController } from './reports.controller';
import { ReportsService } from './reports.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ProductRepository,
      UserRepository,
      StorageRepository,
    ]),
  ],
  controllers: [ReportsController],
  providers: [ReportsService],
})
export class ReportModule {}
