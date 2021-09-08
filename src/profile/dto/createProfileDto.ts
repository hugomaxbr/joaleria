import { IsString, MaxLength } from 'class-validator';

export class CreateProfileDto {
  @IsString()
  @MaxLength(60)
  description: string;
}
