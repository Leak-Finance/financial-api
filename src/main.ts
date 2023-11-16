import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  // Auto-validation for DTO
  app.useGlobalPipes(new ValidationPipe());

  // Open API Configuration
  const openApiConfig = new DocumentBuilder()
    .setTitle('Leak Finance API')
    .setDescription(
      'The Readr API allows developers to have access to all the backend data' +
        ' for the car-selling web app',
    )
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, openApiConfig);
  SwaggerModule.setup('api', app, document);

  // Port
  const configService = app.get(ConfigService);
  const port = configService.get('PORT') || 3000;

  await app.listen(port);
}
bootstrap();
