import { IsCurrency, IsInt, IsString, MaxLength } from 'class-validator';

export class CreateProductDto {
  @IsString()
  @MaxLength(60)
  description: string;

  @IsString()
  details: string;

  @IsCurrency({
    symbol: 'R$',
    require_symbol: false,
    allow_decimal: true,
    allow_negatives: false,
    digits_after_decimal: [2],
  })
  value: string;

  @IsInt()
  current_quantity: number;
}
