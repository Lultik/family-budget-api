import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { Request } from "express";
import { ExtractJwt, Strategy } from "passport-jwt";
import { JWT_SECRET } from "../../common/constants";
import { ACCESS_TOKEN } from "../constants";
import { IJwtPayload } from "../interfaces";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, "jwt") {
  constructor(private readonly configService: ConfigService) {
    super({
      secretOrKey: configService.get(JWT_SECRET),
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req: Request) => {
          return req?.cookies?.[ACCESS_TOKEN];
        },
      ]),
      ignoreExpiration: false,
    });
  }

  async validate({ id, role }: IJwtPayload) {
    return {
      id,
      role,
    };
  }
}
