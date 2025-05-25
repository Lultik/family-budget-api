import { ApiProperty } from "@nestjs/swagger";
import { ITenant } from "../interfaces";

export class TenantDto implements ITenant {
  @ApiProperty({
    description: "Tenant id",
    required: true,
    example: "f38b5d21-636e-4ca1-925f-04ec953a0bdc",
  })
  tenantId: string;

  @ApiProperty({
    description: "User Name",
    required: true,
    example: "My Family",
  })
  name: string;
}
