import { BadRequestException } from "@nestjs/common";
import { AUTH_ERROR_MESSAGE } from "../constants";

export class EmptyPasswordException extends BadRequestException {
  constructor() {
    super(AUTH_ERROR_MESSAGE.EMPTY_PASSWORD, "EMPTY_PASSWORD");
  }
}
