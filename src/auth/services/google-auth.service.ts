import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Response } from "express";
import { Op } from "sequelize";
import { FRONTEND_URL } from "../../common/constants";
import { UserService } from "../../user/services";
import { IRequestWithGooglePayload } from "../interfaces";
import { JwtAuthService } from "./jwt-auth.service";

@Injectable()
export class GoogleAuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtAuthService: JwtAuthService,
    private readonly configService: ConfigService,
  ) {}

  async login(req: IRequestWithGooglePayload, res: Response) {
    const { user } = req;

    const { googleId, email } = user;
    let existedUser = await this.userService.findUserByFilterQuery({
      [Op.or]: [
        {
          googleId,
        },
        { email },
      ],
    });

    if (!existedUser) {
      existedUser = await this.userService.create(user);
    } else if (!existedUser.googleId || !existedUser.email) {
      await this.userService.updateExistingUser(existedUser, user);
    }

    const { id, role } = existedUser;

    this.jwtAuthService.signToken(res, { id, role });
    const frontendUrl = this.configService.get(FRONTEND_URL) ?? "/";
    res.redirect(frontendUrl);
  }
}
