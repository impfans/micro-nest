import { NestFactory } from '@nestjs/core';
import { AppModule } from './user.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { USER_PACKAGE_NAME } from '@pb/user.pb';
async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.GRPC,
      options: {
        url: '0.0.0.0:50051',
        protoPath: './../micro-proto/user.proto',
        package: USER_PACKAGE_NAME,
        loader: {
          longs: Number,
        },
      },
    },
  );
  await app.listen();
}
bootstrap();
