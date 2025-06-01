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
import { User } from "../../user/models";
import { AccountDto } from "../dto/account.dto";
import { CreateAccountDto } from "../dto/create-account.dto";
import { AccountType, IAccount } from "../interfaces";

@Table({
  tableName: "account",
  paranoid: true,
  defaultScope: {
    attributes: {
      exclude: ["createdAt", "updatedAt", "deletedAt"],
    },
    raw: true,
    nest: true,
  },
})
export class Account extends Model<AccountDto, CreateAccountDto> implements IAccount {
  @PrimaryKey
  @Column({
    type: DataType.UUID,
    primaryKey: true,
    defaultValue: UUIDV4,
    allowNull: false,
    field: "account_id",
    onDelete: "RESTRICT",
  })
  id: string;

  @ForeignKey(() => User)
  @Column({
    type: DataType.UUID,
    allowNull: true,
    field: "user_id",
    onDelete: "RESTRICT",
  })
  userId: string;

  @Column({
    type: DataType.ENUM(...Object.values(AccountType)),
    allowNull: true,
    field: "type",
    onDelete: "RESTRICT",
  })
  type: AccountType;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: false,
    onDelete: "RESTRICT",
    field: "account_name",
  })
  name: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
    field: "currency",
    onDelete: "RESTRICT",
  })
  currency: string;

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
  user: User;
}
