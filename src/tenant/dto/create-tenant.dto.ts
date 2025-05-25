import { TenantDto } from "./tenant.dto";

export class CreateTenantDto extends TenantDto {
  constructor(name: string) {
    super();
    this.name = name;
  }
}
