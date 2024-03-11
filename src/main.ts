import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './common/filters/error-middleware';
import cors, { CorsOptions } from 'cors';
import { Logger } from '@nestjs/common';

const logger: Logger = new Logger('Application');
async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.useGlobalFilters(new AllExceptionsFilter());
  app.enableCors()
  logger.log("update is working")
  await app.listen(3000);
}
bootstrap();