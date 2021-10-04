import { IsCurrency, IsEnum, IsInt, IsUUID } from 'class-validator';
import { Action } from '../enums/action.enum';

export class CreateStorageDto {
  @IsCurrency({
    symbol: 'R$',
    require_symbol: false,
    allow_decimal: true,
    allow_negatives: false,
    digits_after_decimal: [2],
  })
  discount: string;

  @IsEnum(Action)
  action: Action;

  @IsUUID()
  product_id: string;

  @IsInt()
  product_quantity: number;
}
