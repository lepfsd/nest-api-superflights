import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExceptionFilter } from './common/filters/http-exception.filter';
import { TimeOutInterceptor } from './common/interceptors/timeout.interceptor';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new AllExceptionFilter());
  app.useGlobalInterceptors(new TimeOutInterceptor());
  app.useGlobalPipes(new ValidationPipe());
  const options = new DocumentBuilder()
    .setTitle('superflight API')
    .setDescription('a awesome API')
    .setVersion('1.0.0')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('/api/docs', app, document, {
    swaggerOptions: {
      filter: true,
    },
  });
  await app.listen(4000);
}
bootstrap();
