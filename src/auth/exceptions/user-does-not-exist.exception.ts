import { NotFoundException } from "@nestjs/common";
import { AUTH_ERROR_MESSAGE } from "../constants";

export class UserDoesNotExistException extends NotFoundException {
  constructor() {
    super(AUTH_ERROR_MESSAGE.DOES_NOT_EXIST, "USER_DOES_NOT_EXIST");
  }
}
