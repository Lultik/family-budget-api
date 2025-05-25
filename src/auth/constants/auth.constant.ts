export const ACCESS_TOKEN = "accessToken";

export const PASSWORD_SALT_GENERATION_ROUNDS = 10;
export const PASSWORD_EXCEPTION_MESSAGES = {
  hasDigit: "The password must contain at least one digit character.",
  hasLowercase: "The password must contain at least one lowercase letter.",
  hasUppercase: "The password must contain at least one uppercase letter",
};

export const AUTH_ERROR_MESSAGE = {
  ALREADY_EXISTS: "User with provided email already exists",
  DOES_NOT_EXIST: "The user with the given email address does not exist",
  EMPTY_PASSWORD: "Password is empty",
  WRONG_PASSWORD: "Wrong password",
  INVALID_CREDENTIALS: "Provided user credentials are invalid",
};
