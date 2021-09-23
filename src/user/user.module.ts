import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserRepository } from './user.repository';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UploadModule } from 'src/upload/upload.module';

@Module({
  imports: [TypeOrmModule.forFeature([UserRepository]), UploadModule],
  controllers: [AuthController, UserController],
  providers: [AuthService, UserService],
})
export class UserModule {}
