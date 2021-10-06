import { IsUUID } from 'class-validator';

export class ParamProductIdDto {
  @IsUUID()
  id: string;
}
