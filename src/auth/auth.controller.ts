import { Controller, Get } from '@nestjs/common';
import { response } from 'express';
import { AuthService } from './auth.service';
import { User } from './user.entity';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get()
  async getAllUsers(
    name: string,
    email: string,
    passwd: string,
  ): Promise<User> {
    return 
  }

}
