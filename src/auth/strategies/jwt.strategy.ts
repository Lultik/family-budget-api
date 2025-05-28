import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { Request } from "express";
import { Strategy } from "passport-jwt";
import { JWT_SECRET } from "../../common/constants";
import { ACCESS_TOKEN } from "../constants";
import { IJwtPayload } from "../interfaces";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, "jwt") {
  constructor(private readonly configService: ConfigService) {
    super({
      secretOrKey: configService.get(JWT_SECRET),
      jwtFromRequest: (req: Request) => req.cookies[ACCESS_TOKEN] || null,
      ignoreExpiration: false,
    });
  }

  async validate({ id, role, tenantId }: IJwtPayload) {
    return {
      id,
      tenantId,
      role,
    };
  }
}
