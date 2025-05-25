import * as crypto from "node:crypto";
import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { SequelizeModule } from "@nestjs/sequelize";
import { LoggerModule } from "nestjs-pino/LoggerModule";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AuthModule } from "./auth/auth.module";
import { getPostgresConnectionConfig } from "./config/postgres.config";
import { TenantModule } from "./tenant/tenant.module";
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
    TenantModule,
    TransactionModule,
    AuthModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
