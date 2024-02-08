import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { WinstonModule } from 'nest-winston';
@Module({
  imports: [UserModule, WinstonModule.forRoot({})],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
