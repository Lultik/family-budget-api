export interface ITransaction {
  id: string;
  userId: string;
  accountId: string;
  categoryId: string;
  amount: number;
  description?: string;
  date: Date;
}
