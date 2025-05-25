import { PickType } from "@nestjs/swagger";
import { UserDto } from "../../user/dto";

export class GoogleUserDataDto extends PickType(UserDto, ["email", "firstName", "lastName", "photo", "googleId"]) {}
