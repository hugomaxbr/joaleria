import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserRepository } from './user.repository';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { ProfileRepository } from '../profile/profile.repository';

@Module({
  imports: [TypeOrmModule.forFeature([UserRepository, ProfileRepository])],
  controllers: [AuthController, UserController],
  providers: [AuthService, UserService],
})
export class UserModule {}
