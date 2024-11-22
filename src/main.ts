import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { AllExceptionsFilter } from './exceptions';
import { Logger, LoggerErrorInterceptor } from 'nestjs-pino';
import {
  DocumentBuilder,
  SwaggerCustomOptions,
  SwaggerModule,
} from '@nestjs/swagger';

const PORT = process.env.PORT || 3001;

async function bootstrap() {
  console.log(`Starting server at port ${PORT}...`);
  const app = await NestFactory.create(AppModule, { bufferLogs: true });
  const httpAdapterHost = app.get(HttpAdapterHost);

  app.enableCors({
    origin: process.env.FRONTEND_URL,
  });

  const config = new DocumentBuilder()
    .setTitle('AI Challenge API')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  const options: SwaggerCustomOptions = {
    swaggerOptions: { filter: true },
  };
  SwaggerModule.setup('/api', app, document, options);

  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapterHost));
  app.useLogger(app.get(Logger));
  app.useGlobalInterceptors(new LoggerErrorInterceptor());
  await app.listen(PORT, () => {
    const logger = app.get(Logger);
    logger.log(`Server started on port ${PORT}`);
  });
}

bootstrap();
