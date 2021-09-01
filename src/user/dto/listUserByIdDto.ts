import { IsUUID } from "class-validator";

export class ListUserByIdDto {
  @IsUUID()
  id: string;
}
