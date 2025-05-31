import * as crypto from "node:crypto";
import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { APP_GUARD } from "@nestjs/core";
import { SequelizeModule } from "@nestjs/sequelize";
import { LoggerModule } from "nestjs-pino/LoggerModule";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AuthModule } from "./auth/auth.module";
import { JwtGuard } from "./auth/guards";
import { JwtStrategy } from "./auth/strategies";
import { CategoryModule } from "./category/category.module";
import { getPostgresConnectionConfig } from "./config/postgres.config";
import { TransactionModule } from "./transaction/transaction.module";
import { UserModule } from "./user/user.module";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getPostgresConnectionConfig,
    }),
    LoggerModule.forRoot({
      pinoHttp: {
        level: "debug",
        genReqId: () => crypto.randomUUID(),
        transport: {
          target: "pino-pretty",
          options: {
            levelFirst: true,
            translateTime: true,
            colorize: true,
          },
        },
      },
    }),
    TransactionModule,
    AuthModule,
    UserModule,
    CategoryModule,
  ],
  controllers: [AppController],
  providers: [AppService, { provide: APP_GUARD, useClass: JwtGuard }, JwtStrategy],
})
export class AppModule {}
