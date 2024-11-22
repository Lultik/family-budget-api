import { PartialType } from '@nestjs/mapped-types';
import { CreateBudgetRecordDto } from './create-budget-record.dto';

export class UpdateBudgetRecordDto extends PartialType(CreateBudgetRecordDto) {}
