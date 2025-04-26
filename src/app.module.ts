import * as crypto from "node:crypto";
import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";
import { LoggerModule } from "nestjs-pino/LoggerModule";
import { BudgetRecordModule } from "./budget-record/budget-record.module";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(process.env.MONGO_CONNECT_STRING, {
      dbName: "family-budget",
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
    BudgetRecordModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
}
