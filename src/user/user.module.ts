import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { Tenant } from "../tenant/models";
import { UserController } from "./controllers/user.controller";
import { User } from "./models";
import { UserService } from "./services";

@Module({
  imports: [SequelizeModule.forFeature([User, Tenant])],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
