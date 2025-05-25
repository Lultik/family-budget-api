import { ApiProperty } from "@nestjs/swagger";
import { ITransaction } from "../interfaces/transaction.interface";

export class TransactionDto implements ITransaction {
  @ApiProperty({
    description: "Transaction id",
    required: true,
    example: "f38b5d21-636e-4ca1-925f-04ec953a0bdc",
  })
  id: string;

  @ApiProperty({
    description: "Tenant id",
    required: true,
    example: "f38b5d21-636e-4ca1-925f-04ec953a0bdc",
  })
  tenantId: string;

  @ApiProperty({
    description: "User id",
    required: true,
    example: "f38b5d21-636e-4ca1-925f-04ec953a0bdc",
  })
  userId: string;

  @ApiProperty({
    description: "Account id",
    required: true,
    example: "f38b5d21-636e-4ca1-925f-04ec953a0bdc",
  })
  accountId: string;

  @ApiProperty({
    description: "Category id",
    required: true,
    example: "f38b5d21-636e-4ca1-925f-04ec953a0bdc",
  })
  categoryId: string;

  @ApiProperty({
    description: "Transaction amount",
    required: true,
    example: 100.5,
  })
  amount: number;

  @ApiProperty({
    description: "Transaction currency",
    required: true,
    example: "USD",
  })
  currency: string;

  @ApiProperty({
    description: "Transaction description",
    required: false,
    example: "Grocery shopping",
  })
  description?: string;

  @ApiProperty({
    description: "Transaction date",
    required: true,
    example: "2023-10-01T12:00:00Z",
  })
  date: Date;
}
