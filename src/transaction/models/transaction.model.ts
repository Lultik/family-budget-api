import { UUIDV4 } from "sequelize";
import { BelongsTo, Column, CreatedAt, DataType, ForeignKey, Model, Table, UpdatedAt } from "sequelize-typescript";
import { Tenant } from "../../tenant/models";
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

  @ForeignKey(() => Tenant)
  @Column({
    type: DataType.UUID,
    field: "tenant_id",
    defaultValue: UUIDV4,
    allowNull: false,
    onDelete: "RESTRICT",
  })
  tenantId: string;

  @Column({
    type: DataType.UUID,
    field: "user_id",
    defaultValue: UUIDV4,
    allowNull: false,
    onDelete: "RESTRICT",
  })
  userId: string;

  @Column({
    type: DataType.UUID,
    field: "account_id",
    defaultValue: UUIDV4,
    allowNull: false,
    onDelete: "RESTRICT",
  })
  accountId: string;

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
    type: DataType.STRING(3),
    allowNull: false,
  })
  currency: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  description?: string;

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  date: Date;

  @Column
  @CreatedAt
  createdAt: Date;

  @Column
  @UpdatedAt
  updatedAt?: Date;

  @BelongsTo(() => Tenant, { foreignKey: "tenantId" })
  tenant: Tenant;
}
