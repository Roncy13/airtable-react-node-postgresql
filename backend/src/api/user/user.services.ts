import  "reflect-metadata";
import { GetConnection } from '@config/database';
import { User } from './user.entity';
import { UserDTO } from './user.dto';
import { GetConn } from "@core/models";
import { Repository } from "typeorm";
import { first } from "lodash";

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

export async function UserUpdate(payload: UserDTO, id: string) {
  const user = await UserById(id);
  const { firstName, lastName } = payload;

  user.firstName = firstName;
  user.lastName = lastName;

  return model.save(user);
}