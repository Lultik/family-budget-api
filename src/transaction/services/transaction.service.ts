import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { AccountService } from "../../account/services/account.service";
import { CreateTransactionDto } from "../dto/create-transaction.dto";
import { UpdateTransactionDto } from "../dto/update-transaction.dto";
import { Transaction } from "../models";

@Injectable()
export class TransactionService {
  constructor(
    @InjectModel(Transaction) private readonly transactionModel: typeof Transaction,
    private readonly accountService: AccountService,
  ) {}

  async create(createTransactionDto: CreateTransactionDto) {
    return this.transactionModel.create(createTransactionDto);
  }

  async createTransaction(createTransactionDto: CreateTransactionDto) {
    const { accountId } = createTransactionDto;
    const transaction = await this.create(createTransactionDto);

    await this.accountService.decreaseBalance(accountId, createTransactionDto.amount);

    return transaction;
  }

  async removeTransaction(id: string) {
    const transaction = await this.transactionModel.findByPk(id);
    if (!transaction) {
      throw new BadRequestException(`Transaction with id ${id} not found`);
    }

    const { accountId, amount } = transaction;
    await this.accountService.increaseBalance(accountId, amount);

    return this.remove(id);
  }

  findAll() {
    return this.transactionModel.findAll();
  }

  findOne(id: string) {
    return `This action returns a #${id} transaction`;
  }

  update(id: string, updateTransactionDto: UpdateTransactionDto) {
    console.log(`Updating transaction with ID: ${id}`, updateTransactionDto);
    return `This action updates a #${id} transaction`;
  }

  remove(id: string) {
    return this.transactionModel.destroy({
      where: {
        id,
      },
    });
  }
}
