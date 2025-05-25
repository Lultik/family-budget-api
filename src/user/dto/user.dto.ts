import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";
import { UserRoles } from "../constants";
import { IUser } from "../interfaces";

export class UserDto implements IUser {
  @ApiProperty({
    description: "User id",
    required: true,
    example: "0ebb7d43-0b66-4c8a-828b-12b45c00fd2a",
  })
  @IsNotEmpty()
  id: string;

  @ApiProperty({
    description: "Tenant id",
    required: true,
    nullable: false,
    example: "0ebb7d43-0b66-4c8a-828b-12b45c00fd2a",
  })
  tenantId: string;

  @ApiProperty({
    description: "User email",
    required: true,
    example: "john.dow@domain.com",
  })
  @IsEmail()
  @IsString()
  email?: string;

  @ApiProperty({
    description: "Hashed user password",
    required: true,
    example: "$2b$10$kHoYp3ktJc9uXDLQBKraoO9HMYdak.XDxTMRpGvr2FnsZFn6pJwym",
  })
  @IsNotEmpty()
  @IsString()
  password: string;

  @ApiProperty({
    description: "User first name",
    required: true,
    example: "John",
  })
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @ApiProperty({
    description: "User last name",
    required: true,
    example: "Dow",
  })
  @IsNotEmpty()
  @IsString()
  lastName: string;

  @ApiProperty({
    description: "User role",
    required: true,
    example: UserRoles.USER,
  })
  @IsNotEmpty()
  @IsString()
  role: UserRoles;

  @ApiProperty({
    description: "Link to user photo",
    required: true,
    example: "https://via.placeholder.com/600/92c952",
  })
  @IsNotEmpty()
  @IsString()
  photo?: string;

  @ApiProperty({
    description: "ID provided from Google",
    required: true,
    example: "10215948379123456",
  })
  @IsNotEmpty()
  @IsString()
  googleId: string;
}
