import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setupSwagger } from './configs/swagger';
import { sleep } from './app.controller';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  setupSwagger(app);
  app.enableCors({
    origin: '*',
    methods: ['GET', 'POST', 'DELETE', 'PATCH'],
  });

  // 종료
  app.enableShutdownHooks();
  process.on('SIGTERM', async (aa) => {
    console.log('끝', aa);
    sleep(4);
    await app.close();
  });
  await app.listen(9500);
}

console.log(process.env.DB_URL, '-URL');
bootstrap();
