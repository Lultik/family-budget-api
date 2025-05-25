import { BadRequestException } from "@nestjs/common";
import { AUTH_ERROR_MESSAGE } from "../constants";

export class WrongPasswordException extends BadRequestException {
  constructor() {
    super(AUTH_ERROR_MESSAGE.WRONG_PASSWORD, "WRONG_PASSWORD");
  }
}
