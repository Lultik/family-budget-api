import { Test, TestingModule } from '@nestjs/testing';
import { BudgetRecordService } from './budget-record.service';

describe('BudgetRecordService', () => {
  let service: BudgetRecordService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BudgetRecordService],
    }).compile();

    service = module.get<BudgetRecordService>(BudgetRecordService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
