import { Injectable } from "@nestjs/common";
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

  findOne(id: number) {
    return `This action returns a #${id} account`;
  }

  update(id: number, updateAccountDto: UpdateAccountDto) {
    return `This action updates a #${id} account`;
  }

  remove(id: number) {
    return `This action removes a #${id} account`;
  }
}
