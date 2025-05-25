import { PartialType, PickType } from "@nestjs/swagger";
import { UserDto } from "./user.dto";

export class AdminUpdateUserDto extends PartialType(
  PickType(UserDto, ["email", "firstName", "lastName", "role", "googleId"]),
) {}
