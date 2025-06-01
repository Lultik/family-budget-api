import { ApiProperty } from "@nestjs/swagger";
import { AccountType, IAccount } from "../interfaces";

export class AccountDto implements IAccount {
  @ApiProperty({
    description: "Account id",
    required: true,
    example: "f38b5d21-636e-4ca1-925f-04ec953a0bdc",
  })
  id: string;

  @ApiProperty({
    description: "User id",
    required: false,
    example: "12345678-1234-1234-1234-123456789012",
  })
  userId: string;

  @ApiProperty({
    enum: AccountType,
    enumName: "AccountType",
    description: "Account Type",
    required: true,
    example: "CASH",
  })
  type: AccountType;

  @ApiProperty({
    description: "Account Currency",
    required: true,
    example: "USD",
  })
  currency: string;

  @ApiProperty({
    description: "Account Name",
    required: true,
    example: "Bank Account",
  })
  name: string;
}
