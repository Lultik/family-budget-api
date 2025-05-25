import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { FindAttributeOptions, ValidationError, WhereOptions } from "sequelize";
import { AdminUpdateUserDto, CreateUserDto, UpdateUserPasswordDto } from "../dto";
import { User } from "../models";

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User)
    private readonly userModel: typeof User,
  ) {}

  async findUserByFilterQuery(where: WhereOptions, attributes?: FindAttributeOptions): Promise<User | null> {
    return await this.userModel.findOne({ where, attributes });
  }

  async create(createUserDto: CreateUserDto) {
    return await this.userModel.create(createUserDto);
  }

  async updateExistingUser(existedUser: User, incomingUserInfo: Partial<User>): Promise<void> {
    existedUser.googleId = incomingUserInfo?.googleId || undefined;
    existedUser.photo = existedUser.photo || incomingUserInfo.photo;

    await existedUser.save();
  }

  async findUserById(id: string, attributes?: FindAttributeOptions): Promise<User> {
    const user = await this.userModel.findByPk(id, { attributes });
    if (!user) {
      throw new NotFoundException(id);
    }

    return user;
  }

  private async updateUser(id: string, updateUserDto: UpdateUserPasswordDto | AdminUpdateUserDto) {
    const where: WhereOptions = { id };
    return await this.userModel.update(updateUserDto, { where });
  }

  async updateUserById(id: string, updateUserDto: UpdateUserPasswordDto | AdminUpdateUserDto) {
    try {
      return await this.updateUser(id, updateUserDto);
    } catch (err) {
      if (err instanceof ValidationError) {
        const messages = err.errors.map((e) => e.message);
        throw new BadRequestException(messages);
      }
      throw new BadRequestException("Failed to update user");
    }
  }
}
