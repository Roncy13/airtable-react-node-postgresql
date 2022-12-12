import "reflect-metadata";
import { GetConn } from "@core/models";
import { Repository } from "typeorm";
import { UserAuthDTO, UserDTO } from './user.dto';
import { User } from './user.entity';
import jwt from 'jsonwebtoken';

const model = GetConn(User) as Repository<User>;

export function UserAllSrv() {
  return model.find();
}

export function UserById(id: string): Promise<User> {
  return model.findOne(id);
}

export function UserCreate(payload: UserDTO) {
  return model.save(payload);
}

export function UserAuthSrv(payload: UserAuthDTO) {
  return payload.username === 'james' && payload.password === 'james'
}

export function UserAuthJwtSrv(payload: UserAuthDTO) {
  const accessToken = jwt.sign({ username: payload.username }, process.env.SECRET_ACCESS_TOKEN, { expiresIn: "5d" });
  return accessToken;
}

export async function UserUpdate(payload: UserDTO, id: string) {
  const user = await UserById(id);
  const { firstName, lastName } = payload;

  user.firstName = firstName;
  user.lastName = lastName;

  return model.save(user);
}