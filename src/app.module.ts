import { Module } from '@nestjs/common';
import { LoggerModule } from 'nestjs-pino/LoggerModule';
import { BudgetRecordModule } from './budget-record/budget-record.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as crypto from 'node:crypto';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    MongooseModule.forRoot(process.env.MONGO_CONNECT_STRING, {
      dbName: 'family-budget',
    }),
    LoggerModule.forRootAsync({
      imports: [ConfigModule.forRoot()],
      inject: [ConfigService],
      useFactory: () => ({
        pinoHttp: {
          genReqId: () => crypto.randomUUID(),
          transport: {
            target: 'pino-pretty',
            options: {
              levelFirst: true,
              translateTime: true,
              colorize: true,
            },
          },
        },
      }),
    }),
    BudgetRecordModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
