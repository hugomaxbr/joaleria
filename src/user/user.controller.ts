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
} from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDto } from "./dto/createUserDto";
import { User } from "./entities/user.entity";
import { ListUserByIdDto } from "./dto/listUserByIdDto";

@Controller("users")
@UseInterceptors(ClassSerializerInterceptor)
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  async createUser(
    @Body(ValidationPipe) createUserDto: CreateUserDto
  ): Promise<void> {
    await this.userService.create(createUserDto);
  }

  @Get()
  listUsers(): Promise<User[]> {
    return this.userService.list();
  }

  @Get(":id")
  listUserById(
    @Param(ValidationPipe) listUserByIdDto: ListUserByIdDto
  ): Promise<User> {
    return this.userService.findOne(listUserByIdDto);
  }

  @Delete(":id")
  async deleteUser(
    @Param(ValidationPipe) deleteUserByDto: ListUserByIdDto
  ): Promise<void> {
    await this.userService.delete(deleteUserByDto);
  }
}
