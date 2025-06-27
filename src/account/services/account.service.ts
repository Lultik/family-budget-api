import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { CreateAccountDto } from "../dto/create-account.dto";
import { UpdateAccountDto } from "../dto/update-account.dto";
import { Account } from "../models/account.model";

@Injectable()
export class AccountService {
  constructor(
    @InjectModel(Account)
    private readonly account: typeof Account,
  ) {}

  create(createAccountDto: CreateAccountDto) {
    return this.account.create(createAccountDto);
  }

  findAll() {
    return this.account.findAll();
  }

  findById(id: string) {
    return this.account.findByPk(id);
  }

  findOne(id: string) {
    return `This action returns a #${id} account`;
  }

  update(id: string, updateAccountDto: UpdateAccountDto) {
    return this.account.update(updateAccountDto, {
      where: { id },
    });
  }

  remove(id: number) {
    return `This action removes a #${id} account`;
  }

  async decreaseBalance(id: string, amount: number) {
    const account = await this.findById(id);
    if (!account) {
      throw new NotFoundException(`Account with ID ${id} not found.`);
    }
    account.balance -= amount;
    return this.update(account.id, { balance: account.balance });
  }

  async increaseBalance(id: string, amount: number) {
    const account = await this.findById(id);
    if (!account) {
      throw new NotFoundException(`Account with ID ${id} not found.`);
    }
    const balance = +amount + +account.balance;
    return this.update(account.id, { balance });
  }
}
