import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { User } from "../user/models";
import { AccountController } from "./controllers/account.controller";
import { Account } from "./models/account.model";
import { AccountService } from "./services/account.service";

@Module({
  imports: [SequelizeModule.forFeature([Account, User])],
  controllers: [AccountController],
  providers: [AccountService],
  exports: [AccountService],
})
export class AccountModule {}
