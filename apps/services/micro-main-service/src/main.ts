import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { v4 as uuidV4 } from 'uuid';
import { NestExpressApplication } from '@nestjs/platform-express';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  // 使用反向代理or负载均衡后获取真实ip
  app.set('trust proxy', 1);
  // 防止在进入中间件前发生报错，无法生成reqId
  app.use((req, _, next) => {
    req.reqId = req.headers['X-Request-Id'] || uuidV4();
    req.reqIp = req.headers['X-Ip'] || '0.0.0.0';
    next();
  });
  app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER));
  await app.listen(3000);
}
bootstrap();
