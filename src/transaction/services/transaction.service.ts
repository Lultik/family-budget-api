import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { CreateTransactionDto } from "../dto/create-transaction.dto";
import { UpdateTransactionDto } from "../dto/update-transaction.dto";
import { Transaction } from "../models";

@Injectable()
export class TransactionService {
  constructor(@InjectModel(Transaction) private readonly transaction: typeof Transaction) {}

  create(createTransactionDto: CreateTransactionDto) {
    return this.transaction.create(createTransactionDto);
  }

  findAll() {
    return this.transaction.findAll();
  }

  findOne(id: string) {
    return `This action returns a #${id} transaction`;
  }

  update(id: string, updateTransactionDto: UpdateTransactionDto) {
    return `This action updates a #${id} transaction`;
  }

  remove(id: string) {
    return `This action removes a #${id} transaction`;
  }
}
