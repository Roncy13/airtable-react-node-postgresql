import SmurfResponse, { SmurfAction } from "@core/response";
import { UserAllSrv, UserById, UserCreate, UserUpdate } from "./user.services";
import { UserDTO } from './user.dto';
import { HTTP_METHODS } from "@utilities/constants";
import { UserByIdSchema, UserSchema, UserUpdateSchema } from "./user.validators";
import { UserGuard } from './user.guard';
import { UserPolicy } from './user.policy';

@SmurfAction({
  action: '/user',
  message: 'User fetched successfully',
})
export class UserApi extends SmurfResponse {

  async run() {
    this.data = await UserAllSrv();
  }
}

@SmurfAction({
  action: '/user',
  method: HTTP_METHODS.POST,
  message: 'User created successfully',
  validation: UserSchema
})
export class UserCreateApi extends SmurfResponse {

  async run() {
    const { body } = this.req;

    this.data = await UserCreate(body);
  }
}

@SmurfAction({
  action: '/user/:id',
  message: 'User fetch successfully',
  validation: UserByIdSchema
})
export class UserGetById extends SmurfResponse {

  async run() {
    const { params } = this.req;

    this.data = await UserById(params.id);
  }
}

@SmurfAction({
  action: '/user/:id',
  method: HTTP_METHODS.PATCH,
  message: 'User created successfully',
  validation: UserUpdateSchema
})
export class UserUpdateApi extends SmurfResponse {

  async run() {
    const { body, params } = this.req;

    this.data = await UserUpdate(body, params.id);
  }
}

@SmurfAction({
  action: '/user/middlewares',
  method: HTTP_METHODS.POST,
  message: 'User with guard and policy successfully',
  guards: [UserGuard],
  policies: [UserPolicy]
})
export class UserWithPolicyAndGuard extends SmurfResponse {

  async run() {
    const { body, params } = this.req;

    this.data = await UserAllSrv();
  }
}