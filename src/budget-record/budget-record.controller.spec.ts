import { Test, TestingModule } from '@nestjs/testing';
import { BudgetRecordController } from './budget-record.controller';
import { BudgetRecordService } from './budget-record.service';

describe('BudgetRecordController', () => {
  let controller: BudgetRecordController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BudgetRecordController],
      providers: [BudgetRecordService],
    }).compile();

    controller = module.get<BudgetRecordController>(BudgetRecordController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
