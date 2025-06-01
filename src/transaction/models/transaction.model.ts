import { UUIDV4 } from "sequelize";
import {
  BelongsTo,
  Column,
  CreatedAt,
  DataType,
  DeletedAt,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
  UpdatedAt,
} from "sequelize-typescript";
import { Account } from "../../account/models/account.model";
import { Category } from "../../category/models";
import { User } from "../../user/models";
import { CreateTransactionDto } from "../dto/create-transaction.dto";
import { TransactionDto } from "../dto/transaction.dto";
import { ITransaction } from "../interfaces";

@Table({
  tableName: "transaction",
  paranoid: true,
  defaultScope: {
    attributes: {
      exclude: ["createdAt", "updatedAt"],
    },
    raw: true,
    nest: true,
  },
})
export class Transaction extends Model<TransactionDto, CreateTransactionDto> implements ITransaction {
  @PrimaryKey
  @Column({
    type: DataType.UUID,
    unique: true,
    primaryKey: true,
    defaultValue: UUIDV4,
    allowNull: false,
    field: "transaction_id",
    onDelete: "RESTRICT",
  })
  id: string;

  @ForeignKey(() => User)
  @Column({
    type: DataType.UUID,
    field: "user_id",
    allowNull: true,
    onDelete: "RESTRICT",
  })
  userId: string;

  @ForeignKey(() => Account)
  @Column({
    type: DataType.UUID,
    field: "account_id",
    defaultValue: UUIDV4,
    allowNull: false,
    onDelete: "RESTRICT",
  })
  accountId: string;

  @ForeignKey(() => Category)
  @Column({
    type: DataType.UUID,
    field: "category_id",
    defaultValue: UUIDV4,
    allowNull: false,
    onDelete: "RESTRICT",
  })
  categoryId: string;

  @Column({
    type: DataType.DECIMAL(10, 2),
    allowNull: false,
  })
  amount: number;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  description?: string;

  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  date: Date;

  @Column
  @CreatedAt
  createdAt: Date;

  @Column
  @UpdatedAt
  updatedAt?: Date;

  @Column
  @DeletedAt
  deletedAt?: Date;

  @BelongsTo(() => User, { foreignKey: "userId" })
  user?: User;

  @BelongsTo(() => Account, { foreignKey: "accountId" })
  account?: Account;

  @BelongsTo(() => Category, { foreignKey: "categoryId" })
  category?: Category;
}
