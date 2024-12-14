import { Body, Controller, Delete, Get, NotFoundException, Param, Patch, Post } from "@nestjs/common";
import type { BudgetRecordService } from "./budget-record.service";
import type { CreateBudgetRecordDto } from "./dto/create-budget-record.dto";
import type { UpdateBudgetRecordDto } from "./dto/update-budget-record.dto";

@Controller("budget-record")
export class BudgetRecordController {
  constructor(private readonly budgetRecordService: BudgetRecordService) {}

  @Post()
  create(@Body() createBudgetRecordDto: CreateBudgetRecordDto) {
    return this.budgetRecordService.create(createBudgetRecordDto);
  }

  @Get()
  findAll() {
    return this.budgetRecordService.findAll();
  }

  @Get(":id")
  async findOne(@Param("id") id: string) {
    const record = await this.budgetRecordService.findOne(id);
    if (!record) {
      throw new NotFoundException(`Record with id ${id} not found`);
    }
    return record;
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateBudgetRecordDto: UpdateBudgetRecordDto) {
    return this.budgetRecordService.update(id, updateBudgetRecordDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.budgetRecordService.remove(id);
  }
}
