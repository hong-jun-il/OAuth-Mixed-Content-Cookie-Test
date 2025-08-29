import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.NEST_PORT || 5000;

  app.enableCors({
    origin: `${process.env.FRONTEND_BASE_URL}`,
    credentials: true,
  });

  app.use(cookieParser());

  await app.listen(port, () => {
    console.log(`${port}에서 실행중`);
  });
}
bootstrap();
