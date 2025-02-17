import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { ConfigService } from '@nestjs/config';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { ValidationFilter } from './validation/validation.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  const logger = app.get(WINSTON_MODULE_NEST_PROVIDER)
  app.useLogger(logger);

  app.use(cookieParser());

  app.useGlobalFilters(new ValidationFilter());

  const configServer = app.get(ConfigService);
  await app.listen(configServer.get("PORT") || 3000);
}
bootstrap();
