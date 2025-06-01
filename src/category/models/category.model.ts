import { UUIDV4 } from "sequelize";
import {
  Column,
  CreatedAt,
  DataType,
  DeletedAt,
  HasMany,
  Model,
  PrimaryKey,
  Table,
  UpdatedAt,
} from "sequelize-typescript";
import { Transaction } from "../../transaction/models";
import { CategoryDto } from "../dto/category.dto";
import { CreateCategoryDto } from "../dto/create-category.dto";
import { ICategory } from "../interfaces/category.interface";

@Table({
  tableName: "category",
  paranoid: true,
  defaultScope: {
    attributes: {
      exclude: ["createdAt", "updatedAt", "deletedAt"],
    },
    raw: true,
    nest: true,
  },
})
export class Category extends Model<CategoryDto, CreateCategoryDto> implements ICategory {
  @PrimaryKey
  @Column({
    type: DataType.UUID,
    primaryKey: true,
    defaultValue: UUIDV4,
    allowNull: false,
    field: "category_id",
    onDelete: "RESTRICT",
  })
  id: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: false,
    onDelete: "RESTRICT",
    field: "name",
  })
  name: string;

  @Column
  @CreatedAt
  createdAt: Date;

  @Column
  @UpdatedAt
  updatedAt?: Date;

  @Column
  @DeletedAt
  deletedAt?: Date;

  @HasMany(() => Transaction)
  transactions: Transaction[];
}
