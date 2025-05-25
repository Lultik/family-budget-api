import { Controller, Get, Param, UseGuards } from "@nestjs/common";
import { JwtGuard } from "../../auth/guards";
import { User } from "../models";
import { UserService } from "../services";

@Controller("users")
@UseGuards(JwtGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(":id")
  getUserById(@Param("id") id: string): Promise<User> {
    return this.userService.findUserById(id);
  }
}
