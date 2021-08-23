import { Body, Controller, Get, Post, ValidationPipe } from '@nestjs/common';
import { response } from 'express';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/CreateUserDto';
import { User } from './user.entity';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

 
    
  @Post('/signup')
  signUp(@Body(ValidationPipe) createUserDto: CreateUserDto): Promise<void> {
        return this.authService.signUp(createUserDto);
    }

}