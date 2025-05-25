import { UserRoles } from "../../user/constants";

export class JwtUserDataDto {
  id: string;
  tenantId: string;
  role: UserRoles;
}
