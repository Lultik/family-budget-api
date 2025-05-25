import { Request } from "express";
import { UserRoles } from "../../user/constants";
import { GoogleUserDataDto } from "../dto/google-user.dto";

export interface IJwtPayload {
  id: string;
  tenantId: string;
  role: UserRoles;
}

export interface IRequestWithGooglePayload extends Request {
  user: GoogleUserDataDto;
}

export interface IRequestWithJwtPayload extends Request {
  user: IJwtPayload;
}
