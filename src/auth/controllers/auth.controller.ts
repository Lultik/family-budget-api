import { Body, Controller, HttpCode, HttpStatus, Patch, Post, Req, Res, UseGuards } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { Response } from "express";
import { Public } from "../decorators";
import { ChangePasswordUserDto, UserLoginDto, UserRegistrationDto } from "../dto";
import { JwtGuard, LocalGuard } from "../guards";
import { IRequestWithJwtPayload } from "../interfaces";
import { AuthService, JwtAuthService } from "../services";

@ApiTags("Authorization")
@Controller("auth")
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly jwtAuthService: JwtAuthService,
  ) {}

  @Public()
  @Post("/registration")
  registration(@Body() userRegistrationDto: UserRegistrationDto) {
    return this.authService.registerUser(userRegistrationDto);
  }

  @UseGuards(JwtGuard)
  @Patch("/change_password")
  changePassword(
    @Body() changePasswordUserDto: ChangePasswordUserDto,
    @Req() req: IRequestWithJwtPayload,
  ): Promise<void> {
    return this.authService.changePassword(req.user.id, changePasswordUserDto);
  }

  @HttpCode(HttpStatus.OK)
  @Public()
  @UseGuards(LocalGuard)
  @Post("/login")
  login(
    @Res({ passthrough: true }) res: Response,
    @Req() req: IRequestWithJwtPayload,
    @Body() userLoginDto: UserLoginDto,
  ) {
    const { id, role } = req.user;

    return this.jwtAuthService.signToken(res, { id, role });
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Post("/logout")
  logout(@Res({ passthrough: true }) res: Response) {
    return this.jwtAuthService.removeToken(res);
  }
}
