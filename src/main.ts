import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setupSwagger } from './configs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  setupSwagger(app);
  app.enableCors({
    origin: '*',
    methods: ['GET', 'POST', 'DELETE', 'PATCH'],
  });

  // 종료
  app.enableShutdownHooks();
  process.on('SIGTERM', async () => {
    console.log('끝');
    await app.close();
  });

  await app.listen(9500);
}
bootstrap();
