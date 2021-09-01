import {
  IsEmail,
  IsString,
  IsUUID,
  Matches,
  MaxLength,
  MinLength,
} from "class-validator";

export class CreateProfileDto {
  @IsString()
  @MaxLength(60)
  description: string;
}
