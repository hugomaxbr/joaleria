import {
  IsEmail,
  IsEnum,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Role } from '../enums/role.enum';
import { IsOnlyDate } from '../validators/IsOnlyDate';

export class CreateUserDto {
  @IsString()
  @MaxLength(60)
  name: string;

  @IsOnlyDate()
  birth_date: Date;

  @IsString()
  cpf: string;

  @IsEnum(Role)
  role: Role;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8)
  @MaxLength(20)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'Password too weak',
  })
  password: string;
}
