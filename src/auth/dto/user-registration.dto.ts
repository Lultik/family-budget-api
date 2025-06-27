import { PickType } from "@nestjs/swagger";
import { UserDto } from "../../user/dto";

export class UserRegistrationDto extends PickType(UserDto, ["email", "password", "firstName", "lastName"]) {}
