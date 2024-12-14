import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import type { Model } from "mongoose";
import type { CreateBudgetRecordDto } from "./dto/create-budget-record.dto";
import type { UpdateBudgetRecordDto } from "./dto/update-budget-record.dto";
import { BudgetRecord } from "./schemas/budget-record.schema";

@Injectable()
export class BudgetRecordService {
  constructor(
    @InjectModel(BudgetRecord.name)
    private budgetRecordModel: Model<BudgetRecord>,
  ) {}

  async create(createBudgetRecordDto: CreateBudgetRecordDto) {
    const newRecord = await this.budgetRecordModel.create(createBudgetRecordDto);
    return newRecord.save();
  }

  findAll() {
    return this.budgetRecordModel.find({ deletedAt: null });
  }

  async findOne(id: string) {
    const record = await this.budgetRecordModel.findOne({
      _id: id,
      deletedAt: null,
    });
    if (!record) {
      throw new NotFoundException();
    }
    return record;
  }

  update(id: string, updateBudgetRecordDto: UpdateBudgetRecordDto) {
    return this.budgetRecordModel.findOneAndUpdate({ _id: id, deletedAt: null }, updateBudgetRecordDto);
  }

  remove(id: string) {
    return this.budgetRecordModel.findOneAndUpdate({ _id: id, deletedAt: null }, { deletedAt: new Date() });
  }
}
