import { UUIDV4 } from "sequelize";
import { Column, CreatedAt, DataType, DeletedAt, Model, PrimaryKey, Table } from "sequelize-typescript";
import { UserRoles } from "../constants";
import { CreateUserDto, UserDto } from "../dto";
import { IUser } from "../interfaces";

@Table({
  tableName: "users",
  defaultScope: {
    attributes: {
      exclude: ["password", "createdAt", "updatedAt"],
    },
    raw: true,
  },
  paranoid: true,
})
export class User extends Model<UserDto, CreateUserDto> implements IUser {
  @PrimaryKey
  @Column({
    primaryKey: true,
    type: DataType.UUID,
    unique: true,
    defaultValue: UUIDV4,
    allowNull: false,
    field: "user_id",
  })
  id: string;

  @Column({
    type: DataType.STRING(),
    unique: true,
    allowNull: true,
  })
  email?: string;

  @Column({
    type: DataType.STRING(),
    allowNull: true,
  })
  password?: string;

  @Column({
    allowNull: false,
    field: "firstname",
  })
  firstName: string;

  @Column({
    allowNull: false,
    field: "lastname",
  })
  lastName: string;

  @Column({
    type: DataType.ENUM(...Object.values(UserRoles)),
    allowNull: false,
    defaultValue: UserRoles.USER,
  })
  role: UserRoles;

  @Column({
    type: DataType.STRING(),
    allowNull: true,
  })
  photo?: string;

  @Column({
    allowNull: true,
    field: "google_id",
  })
  googleId?: string;

  @Column
  @DeletedAt
  deletedAt?: Date;

  @Column
  @CreatedAt
  createdAt?: Date;
}
