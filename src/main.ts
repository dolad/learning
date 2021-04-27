import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as helmet from 'helmet';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import CorsConfig from './cors.config';
import { json, urlencoded } from 'express';
import { ValidationPipe } from './shared/pipes/validation.pipes';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true,
    bodyParser: false,
  });

  const options = new DocumentBuilder()
    .setTitle('Learning Management API')
    .setDescription('Learning Management API description')
    .setVersion('1.0')
    .addBasicAuth()
    .build();

  app.setGlobalPrefix('/api/v1');
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('docs', app, document);
  app.use(helmet());
  app.use(json({ limit: '100mb' }));
  app.use(urlencoded({ limit: '100mb', extended: true }));

  const port = process.env.PORT || 4500;

  await app.listen(port);
  console.log(`Listening on port: ${port}`);
  console.log(`Explore api on http://localhost:${port}/api`);
}
bootstrap();
