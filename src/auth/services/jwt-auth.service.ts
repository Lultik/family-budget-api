import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { Response } from "express";
import { JWT_SECRET } from "../../common/constants";
import { ACCESS_TOKEN } from "../constants";
import { IJwtPayload } from "../interfaces";

@Injectable()
export class JwtAuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

  signToken(res: Response, payload: IJwtPayload) {
    const token = this.jwtService.sign(payload, {
      secret: this.configService.get(JWT_SECRET),
    });

    res.cookie(ACCESS_TOKEN, token, { httpOnly: true });
  }

  removeToken(res: Response) {
    res.clearCookie(ACCESS_TOKEN);

    return {
      [ACCESS_TOKEN]: null,
    };
  }
}
