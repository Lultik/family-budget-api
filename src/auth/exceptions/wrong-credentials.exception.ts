import { UnauthorizedException } from "@nestjs/common";
import { AUTH_ERROR_MESSAGE } from "../constants";

export class WrongCredentialsException extends UnauthorizedException {
  constructor() {
    super(AUTH_ERROR_MESSAGE.INVALID_CREDENTIALS, "INVALID_CREDENTIALS");
  }
}
