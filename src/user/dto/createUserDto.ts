import {
  IsEmail,
  IsString,
  IsUUID,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { IsOnlyDate } from '../validators/IsOnlyDate';

export class CreateUserDto {
  @IsString()
  @MaxLength(60)
  name: string;

  @IsOnlyDate()
  birth_date: Date;

  @IsUUID()
  profile_id: string;

  @IsString()
  cpf: string;

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
