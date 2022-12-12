import SmurfResponse, { SmurfAction } from "@core/response";
import { AuthenticateTokenGuard } from "@guards/authentication.guard";
import { HTTP_METHODS } from "@utilities/constants";
import { UserAuthPolicy, UserPolicy } from './user.policy';
import { UserAllSrv, UserAuthJwtSrv, UserById, UserCreate, UserUpdate } from "./user.services";
import { UserAuthTransformer } from './user.transformer';
import { UserAuthSchema, UserByIdSchema, UserSchema, UserUpdateSchema } from "./user.validators";

@SmurfAction({
  action: '/user/auth',
  method: HTTP_METHODS.POST,
  policies: [UserAuthPolicy],
  validation: UserAuthSchema,
  message: 'User logged in successfully',
})
export class SampleAuthenticationApi extends SmurfResponse {

  async run() {
    const payload = UserAuthTransformer(this.req.body);

    this.data = await UserAuthJwtSrv(payload);
  }
}

@SmurfAction({
  action: '/user',
  guards: [AuthenticateTokenGuard],
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
  guards: [AuthenticateTokenGuard],
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
  guards: [AuthenticateTokenGuard],
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
  guards: [AuthenticateTokenGuard],
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
  guards: [AuthenticateTokenGuard],
  policies: [UserPolicy]
})
export class UserWithPolicyAndGuard extends SmurfResponse {

  async run() {
    this.data = await UserAllSrv();
  }
}