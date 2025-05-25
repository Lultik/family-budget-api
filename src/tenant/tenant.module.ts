import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { User } from "../user/models";
import { TenantController } from "./controllers/tenant.controller";
import { Tenant } from "./models";
import { TenantService } from "./service/tenant.service";

@Module({
  imports: [SequelizeModule.forFeature([Tenant, User])],
  controllers: [TenantController],
  providers: [TenantService],
  exports: [TenantService],
})
export class TenantModule {}
