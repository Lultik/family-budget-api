import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { compare, genSalt, hash } from "bcrypt";
import { FindAttributeOptions, WhereOptions } from "sequelize";
import { User } from "../../user/models";
import { UserService } from "../../user/services";
import { PASSWORD_SALT_GENERATION_ROUNDS } from "../constants";
import { ChangePasswordUserDto, JwtUserDataDto, UserLoginDto, UserRegistrationDto } from "../dto";
import {
  EmptyPasswordException,
  UserAlreadyExistsException,
  UserDoesNotExistException,
  WrongPasswordException,
} from "../exceptions";

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async registerUser(userRegistrationDto: UserRegistrationDto): Promise<User> {
    const { password, ...userData } = userRegistrationDto;
    const user = await this.userService.findUserByFilterQuery({
      email: userData.email,
    });

    if (user) {
      throw new UserAlreadyExistsException();
    }

    const hashedPassword = await this.hashPassword(password);

    return this.userService.create({
      ...userData,
      password: hashedPassword,
    });
  }

  async changePassword(id: string, changePasswordUserDto: ChangePasswordUserDto): Promise<void> {
    const { oldPassword, password: newPassword } = changePasswordUserDto;
    const { password: passwordFromDB } = await this.userService.findUserById(id, ["password"]);
    await this.validatePassword(oldPassword, passwordFromDB);
    const hashedPassword = await this.hashPassword(newPassword);
    await this.userService.updateUserById(id, { password: hashedPassword });
  }

  private async validatePassword(inputPassword: string, passwordFromDB: string | undefined): Promise<void> {
    if (!passwordFromDB) {
      throw new EmptyPasswordException();
    }

    const isCorrectUserPassword = await compare(inputPassword, passwordFromDB);
    if (!isCorrectUserPassword) {
      throw new WrongPasswordException();
    }
  }

  async getValidatedJWTUserData(userLoginDto: UserLoginDto): Promise<JwtUserDataDto> {
    const { email, password: inputPassword } = userLoginDto;
    const where: WhereOptions = {
      email,
    };
    const attributes: FindAttributeOptions = {
      include: ["password"],
    };

    const user = await this.userService.findUserByFilterQuery(where, attributes);
    if (!user) {
      throw new UserDoesNotExistException();
    }

    const { password: savedPassword, id, role } = user;

    await this.validatePassword(inputPassword, savedPassword);
    return { id, role };
  }

  private async hashPassword(password: string): Promise<string> {
    const salt = await genSalt(PASSWORD_SALT_GENERATION_ROUNDS);
    return hash(password, salt);
  }
}
