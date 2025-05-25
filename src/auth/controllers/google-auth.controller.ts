import { Controller, Get, Req, Res, UseGuards } from "@nestjs/common";
import { Response } from "express";
import { GoogleGuard } from "../guards/google.guard";
import { IRequestWithGooglePayload } from "../interfaces";
import { GoogleAuthService } from "../services";

@Controller("auth/google")
export class GoogleAuthController {
  constructor(private googleAuthService: GoogleAuthService) {}

  @UseGuards(GoogleGuard)
  @Get("/redirect")
  googleLoginRedirect(@Req() req: IRequestWithGooglePayload, @Res() res: Response) {
    return this.googleAuthService.login(req, res);
  }
}
