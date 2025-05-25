import { ApiProperty, PickType } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";
import { UserDto } from "../../user/dto";

export class ChangePasswordUserDto extends PickType(UserDto, ["password"]) {
  @ApiProperty({
    example: "Password1",
  })
  @IsNotEmpty()
  @IsString()
  oldPassword: string;
}
