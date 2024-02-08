import { Controller, Get, Inject, OnModuleInit, Post } from '@nestjs/common';
import { ClientGrpc, ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { Metadata } from '@grpc/grpc-js';
import {
  FindOneReq,
  FindOneRes,
  USER_PACKAGE_NAME,
  USER_SERVICE_NAME,
  UserServiceClient,
  UserServiceController,
} from '@pb/user.pb';
import * as winston from 'winston';
const LogstashTransport = require("winston-logstash/lib/winston-logstash-latest");
@Controller(USER_PACKAGE_NAME)
export class UserController implements OnModuleInit {
  private userService: UserServiceController;
  private logger;
  constructor(
    @Inject(USER_SERVICE_NAME) private readonly client: ClientGrpc,
    // @Inject(USER_SERVICE_NAME) private readonly clientProxy: ClientProxy,
  ) {
    this.logger = winston.createLogger({
      transports: [
        new LogstashTransport({
          port: 9200,
          host: 'localhost',
          node_name: 'logstash-1',
        }),
      ],
    });
  }
  onModuleInit() {
    this.userService =
      this.client.getService<UserServiceClient>(USER_SERVICE_NAME);
  }

  @Post('findOne')
  findOne(): any {
    const metadata: any = new Metadata();
    metadata.add('requestId', '123');
    metadata.add('Set-Cookie', '4444442131231');
    const o: any = {};
    // this.clientProxy.send('requestId', '123123123');
    this.logger.info('123123123');
    return this.userService.findOne({ ...o }, metadata);
  }
}
