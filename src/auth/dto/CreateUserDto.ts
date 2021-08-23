import { Type } from 'class-transformer';
import {
    IsDate,
    isDate,
    IsDateString,
    isDateString,
    IsEmail,
    IsNotEmpty,
    IsString,
    Matches,
    MaxLength,
    MinLength,
} from 'class-validator';
import { IsOnlyDate } from '../validators/IsOnlyDate';

export class CreateUserDto {

    @IsString()
    @MaxLength(60)
    name : string;
   
    @IsOnlyDate()
    birth_date : Date;

    @IsString()
    cpf: string;

    @IsEmail()
    email : string;

    @IsString()
    @MinLength(8)
    @MaxLength(20)
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
        message: 'Password too weak',
    })
    password: string;
}
