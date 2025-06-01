import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { Category } from "src/category/models";
import { Account } from "../account/models/account.model";
import { User } from "../user/models";
import { TransactionController } from "./controllers/transaction.controller";
import { Transaction } from "./models";
import { TransactionService } from "./services/transaction.service";

@Module({
  imports: [SequelizeModule.forFeature([Transaction, User, Account, Category])],
  controllers: [TransactionController],
  providers: [TransactionService],
  exports: [TransactionModule],
})
export class TransactionModule {}
