import { INestApplication } from '@nestjs/common';
import { DocumentBuilder } from '@nestjs/swagger';
import { SwaggerModule } from '@nestjs/swagger/dist';

export const setupSwagger = (app: INestApplication): void => {
  const configSwagger = new DocumentBuilder()
    .setTitle('테스트 API 명세서')
    .setDescription('API 명세서 swagger 테스트')
    .setVersion('0.0.1')
    .addTag('?')
    .build();
  const document = SwaggerModule.createDocument(app, configSwagger);
  SwaggerModule.setup('api', app, document);
};
