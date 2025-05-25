import { BadRequestException } from "@nestjs/common";
import { AUTH_ERROR_MESSAGE } from "../constants";

export class UserAlreadyExistsException extends BadRequestException {
  constructor() {
    super(AUTH_ERROR_MESSAGE.ALREADY_EXISTS, "USER_EXISTS");
  }
}
