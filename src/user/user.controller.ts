import {
  Body,
  Controller,
  ValidationPipe,
  Post,
  Get,
  Param,
  UseInterceptors,
  ClassSerializerInterceptor,
  Delete,
  Put,
  UploadedFile,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/createUserDto';
import { User } from './entities/user.entity';
import { ListUserByIdDto } from './dto/listUserByIdDto';
import { UpdateUserDto } from './dto/updateUserDto';
import { GetAuthenticatedUser } from './decorators/auth.decorator';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('users')
@UseInterceptors(ClassSerializerInterceptor)
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  async createUser(
    @Body(ValidationPipe) createUserDto: CreateUserDto,
  ): Promise<void> {
    console.log("teste");
    await this.userService.create(createUserDto);
  }

  @Get()
  listUsers(@GetAuthenticatedUser() _: string): Promise<User[]> {
    return this.userService.list();
  }

  @Get(':id')
  listUserById(
    @Param(ValidationPipe) listUserByIdDto: ListUserByIdDto,
  ): Promise<User> {
    return this.userService.findOne(listUserByIdDto);
  }

  @Delete(':id')
  async deleteUser(
    @Param(ValidationPipe) deleteUserByDto: ListUserByIdDto,
  ): Promise<void> {
    await this.userService.delete(deleteUserByDto);
  }

  @Put(':id')
  async updateUser(
    @Param(ValidationPipe) listUserByIdDto: ListUserByIdDto,
    @Body(ValidationPipe) updateUserDto: UpdateUserDto,
  ): Promise<void> {
    await this.userService.update(updateUserDto, listUserByIdDto);
  }

  @UseInterceptors(FileInterceptor('avatar'))
  @Post('avatar')
  async insertProfilePic(
    @UploadedFile() avatar: Express.Multer.File,
    @GetAuthenticatedUser() id: string,
  ) {
    return this.userService.insertProfilePic(avatar, id);
  }
}
