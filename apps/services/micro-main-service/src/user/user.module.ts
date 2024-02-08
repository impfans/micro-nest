import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { UserController } from './user.controller';
import { resolve } from 'path';
import { USER_PACKAGE_NAME, USER_SERVICE_NAME } from '@pb/user.pb';
@Module({
  imports: [
    ClientsModule.register([
      {
        name: USER_SERVICE_NAME,
        transport: Transport.GRPC,
        options: {
          url: '0.0.0.0:50051',
          protoPath: resolve(
            __dirname,
            '../../../../../micro-proto/user.proto',
          ),
          package: USER_PACKAGE_NAME,
          loader: {
            longs: Number,
          },
        },
      },
    ]),
  ],
  providers: [],
  controllers: [UserController],
})
export class UserModule {}
