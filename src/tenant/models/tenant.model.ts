import { UUIDV4 } from "sequelize";
import { Column, CreatedAt, DataType, DeletedAt, Model, Table, UpdatedAt } from "sequelize-typescript";
import { CreateTenantDto } from "../dto/create-tenant.dto";
import { TenantDto } from "../dto/tenant.dto";
import { ITenant } from "../interfaces";

@Table({
  tableName: "tenant",
  paranoid: true,
  defaultScope: {
    attributes: {
      exclude: ["createdAt", "updatedAt"],
    },
    raw: true,
    nest: true,
  },
})
export class Tenant extends Model<TenantDto, CreateTenantDto> implements ITenant {
  @Column({
    type: DataType.UUID,
    primaryKey: true,
    defaultValue: UUIDV4,
    allowNull: false,
    field: "tenant_id",
    onDelete: "RESTRICT",
  })
  tenantId: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: false,
    onDelete: "RESTRICT",
    field: "tenant_name",
  })
  name: string;

  @Column({})
  @CreatedAt
  createdAt: Date;

  @Column
  @UpdatedAt
  updatedAt?: Date;

  @Column
  @DeletedAt
  deletedAt?: Date;
}
