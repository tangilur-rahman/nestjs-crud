import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // for validation input data
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  // for documentation
  const config = new DocumentBuilder()
    .setTitle('NextJs CRUD example')
    .setDescription('The NextJs CRUD API description')
    .setVersion('1.0')
    .addTag('NextJs CRUD')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  // start server
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
