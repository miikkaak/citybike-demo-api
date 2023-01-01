import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //cors with options, lets allow only localhost for development purposes
  app.enableCors({
    origin: ['localhost'],
  });

  //global incoming data validation pipeline (class-validator used inside resources)
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
