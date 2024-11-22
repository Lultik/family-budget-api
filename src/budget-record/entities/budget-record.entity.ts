import { UUID } from 'crypto';

export class BudgetRecord {
  id: UUID;
  value: number;
  category: string;
  description?: string;
  timestamp?: string;
  createdBy?: string;
}
