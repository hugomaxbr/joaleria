import { IsEmail, IsString, IsUUID, MaxLength } from 'class-validator';
import { IsOnlyDate } from '../validators/IsOnlyDate';

export class UpdateUserDto {
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
}
