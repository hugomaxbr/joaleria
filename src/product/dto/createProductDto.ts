import { IsDecimal, IsInt, IsString, MaxLength } from 'class-validator';

export class CreateProductDto {
  @IsString()
  @MaxLength(60)
  description: string;

  @IsString()
  details: string;

  @IsDecimal()
  value: number;

  @IsInt()
  current_quantity: number;
}
