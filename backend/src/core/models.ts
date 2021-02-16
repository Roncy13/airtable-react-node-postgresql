import { GetConnection } from "@config/database";
import { getConnection } from "typeorm";

export const GetConn = (schema: any) =>
  GetConnection(schema).manager.getRepository(schema);
export const RawQuery = getConnection().query
