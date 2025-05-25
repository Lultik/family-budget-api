import { ConfigService } from "@nestjs/config";
import { SequelizeModuleOptions } from "@nestjs/sequelize";
import { DATABASE_URL } from "../common/constants";

export const getPostgresConnectionConfig = async (configService: ConfigService): Promise<SequelizeModuleOptions> => {
  return {
    dialect: "postgres",
    uri: configService.get(DATABASE_URL),
    autoLoadModels: true,
  };
};
