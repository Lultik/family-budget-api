import { Controller, Get, Param, Req, UseGuards } from "@nestjs/common";
import { JwtGuard } from "../../auth/guards";
import { IRequestWithJwtPayload } from "../../auth/interfaces";
import { User } from "../models";
import { UserService } from "../services";

@Controller("users")
@UseGuards(JwtGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get("me")
  getMe(@Req() req: IRequestWithJwtPayload) {
    const { user } = req;
    const { id } = user;

    console.log("UserController.getMe", user);

    console.log("User ID from request:", id);

    return this.userService.findUserById(id);
  }

  @Get(":id")
  getUserById(@Param("id") id: string): Promise<User> {
    return this.userService.findUserById(id);
  }
}
