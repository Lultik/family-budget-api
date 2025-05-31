import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { AuthService } from "../services";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, "local") {
  constructor(private readonly authService: AuthService) {
    super({
      passwordField: "password",
      usernameField: "email",
    });
  }

  async validate(email: string, password: string) {
    console.log("LocalStrategy.validate", { email, password });
    const user = await this.authService.getValidatedJWTUserData({ email, password });
    console.log("User found:", user);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
