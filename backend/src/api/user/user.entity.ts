import "reflect-metadata";
import { Entity, Column } from "typeorm";
import { BaseEntity } from "@models/base-entity";
import { VARCHAR_STR } from "@utilities/constants";

@Entity()
export class User extends BaseEntity {
  @Column({
    length: VARCHAR_STR.MAX_LENGTH
  })
  firstName: string;

  @Column({
    length: VARCHAR_STR.MAX_LENGTH
  })
  lastName: string;
}