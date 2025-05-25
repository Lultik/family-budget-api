import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Response } from "express";
import { Strategy } from "passport-local";
import { JwtUserDataDto } from "../dto";
import { AuthService } from "../services";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, "local") {
  constructor(private readonly authService: AuthService) {
    super({
      passReqToCallback: true,
      passwordField: "password",
      usernameField: "email",
    });
  }

  async validate(res: Response, email: string, password: string, done: (err: unknown, user: JwtUserDataDto) => void) {
    const jwtUserData = await this.authService.getValidatedJWTUserData({
      email,
      password,
    });
    done(null, jwtUserData);
  }
}
