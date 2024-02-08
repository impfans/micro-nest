import { Injectable } from '@nestjs/common';
import {
  FindOneReq,
  FindAllReq,
  LoginReq,
  RegisterReq,
  FindOneRes,
} from '@pb/user.pb';

@Injectable()
export class UserService {
  async findOne(params: FindOneReq): Promise<FindOneRes> {
    return Promise.resolve({
      user: {
        id: 1,
        name: 'test',
        password: 'string',
        avatar: 'string',
      },
    });
  }
}
