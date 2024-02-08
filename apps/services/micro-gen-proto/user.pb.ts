/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";

export const protobufPackage = "user";

export interface User {
  id: number;
  name: string;
  password: string;
  avatar: string;
}

export interface MeteData {
  key: string;
  value: string;
}

export interface FindOneReq {
  id: number;
}

export interface FindOneRes {
  user: User | undefined;
}

export interface FindAllReq {
}

export interface FindAllRes {
  user: User[];
}

export interface LoginReq {
  name: string;
  password: string;
}

export interface LoginRes {
  code: number;
  user: User | undefined;
}

export interface RegisterReq {
  user: User | undefined;
}

export interface RegisterRes {
  code: number;
  user: User | undefined;
}

export const USER_PACKAGE_NAME = "user";

export interface UserServiceClient {
  findOne(request: FindOneReq): Observable<FindOneRes>;

  findAll(request: FindAllReq): Observable<FindAllRes>;

  login(request: LoginReq): Observable<LoginRes>;

  register(request: RegisterReq): Observable<RegisterRes>;
}

export interface UserServiceController {
  findOne(request: FindOneReq, metadata: MeteData): Promise<FindOneRes> | Observable<FindOneRes> | FindOneRes;

  findAll(request: FindAllReq): Promise<FindAllRes> | Observable<FindAllRes> | FindAllRes;

  login(request: LoginReq): Promise<LoginRes> | Observable<LoginRes> | LoginRes;

  register(request: RegisterReq): Promise<RegisterRes> | Observable<RegisterRes> | RegisterRes;
}

export function UserServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ["findOne", "findAll", "login", "register"];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("UserService", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("UserService", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const USER_SERVICE_NAME = "UserService";
