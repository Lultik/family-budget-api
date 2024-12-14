import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { BudgetRecordController } from "./budget-record.controller";
import { BudgetRecordService } from "./budget-record.service";
import { BudgetRecord, BudgetRecordSchema } from "./schemas/budget-record.schema";

@Module({
  imports: [MongooseModule.forFeature([{ name: BudgetRecord.name, schema: BudgetRecordSchema }])],
  controllers: [BudgetRecordController],
  providers: [BudgetRecordService],
})
export class BudgetRecordModule {}
