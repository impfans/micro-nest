import { Controller } from '@nestjs/common';
import { UserService } from './user.service';
import { GrpcMethod } from '@nestjs/microservices';
import {
  FindOneReq,
  FindAllReq,
  LoginReq,
  RegisterReq,
  USER_SERVICE_NAME,
} from '@pb/user.pb';
import { Metadata, ServerUnaryCall } from '@grpc/grpc-js';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @GrpcMethod(USER_SERVICE_NAME, 'FindOne')
  FindOne(
    data: FindOneReq,
    metadata: Metadata,
    call: ServerUnaryCall<any, any>,
  ) {
    console.log(metadata)
    return this.userService.findOne(data);
  }
}
