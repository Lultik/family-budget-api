export interface ITransaction {
  id: string;
  tenantId: string;
  userId: string;
  accountId: string;
  categoryId: string;
  amount: number;
  currency: string;
  description?: string;
  date: Date;
  createdAt?: Date;
}
