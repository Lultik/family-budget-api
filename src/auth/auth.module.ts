import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { UserModule } from "../user/user.module";
import { AuthController, GoogleAuthController } from "./controllers";
import { AuthService, GoogleAuthService, JwtAuthService } from "./services";
import { GoogleStrategy, JwtStrategy, LocalStrategy } from "./strategies";

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: "jwt" }),
    UserModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>("JWT_SECRET"),
        signOptions: {
          expiresIn: Number.parseInt(configService.getOrThrow<string>("ACCESS_TOKEN_VALIDITY_DURATION_IN_SEC")),
        },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController, GoogleAuthController],
  providers: [AuthService, JwtAuthService, GoogleAuthService, GoogleStrategy, JwtStrategy, LocalStrategy],
  exports: [JwtModule, AuthService, PassportModule],
})
export class AuthModule {}
