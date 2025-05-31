import { UserRoles } from "../../user/constants";

export class JwtUserDataDto {
  id: string;
  role: UserRoles;
}
