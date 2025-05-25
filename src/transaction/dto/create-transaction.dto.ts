import { PartialType } from "@nestjs/swagger";
import { TransactionDto } from "./transaction.dto";

export class CreateTransactionDto extends PartialType(TransactionDto) {}
