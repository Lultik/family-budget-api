import { AccountType } from "./accountType.interface";

export interface IAccount {
  id: string;
  userId: string;
  type: AccountType;
  name: string;
  currency: string;
}
