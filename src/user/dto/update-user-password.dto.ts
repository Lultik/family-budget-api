import { PickType } from "@nestjs/swagger";
import { UserRegistrationDto } from "../../auth/dto/user-registration.dto";

export class UpdateUserPasswordDto extends PickType(UserRegistrationDto, ["password"]) {}
