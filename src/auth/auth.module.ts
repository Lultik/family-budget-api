import { Module } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { UserModule } from "../user/user.module";
import { AuthController, GoogleAuthController } from "./controllers";
import { AuthService, GoogleAuthService, JwtAuthService } from "./services";
import { GoogleStrategy, JwtStrategy, LocalStrategy } from "./strategies";

@Module({
  imports: [PassportModule, UserModule],
  controllers: [AuthController, GoogleAuthController],
  providers: [AuthService, JwtService, JwtAuthService, GoogleAuthService, GoogleStrategy, JwtStrategy, LocalStrategy],
})
export class AuthModule {}
