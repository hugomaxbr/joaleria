import { Role } from '../enums/role.enum';

export interface responseSignInDto {
  name: string;
  token: string;
  role: Role;
}
