import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setupSwagger } from './configs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: '*',
    methods: ['GET', 'POST', 'DELETE', 'PATCH'],
  });
  // swagger 셋업
  setupSwagger(app);

  await app.listen(9500);
}
bootstrap();
