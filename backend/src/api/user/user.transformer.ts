import { UserAuthDTO } from "./user.dto"

export const UserAuthTransformer = (payload: any) => {
  return {
    username: payload.username,
    password: payload.password
  } as UserAuthDTO;
}