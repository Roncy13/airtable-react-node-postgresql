import "reflect-metadata";
import { Entity, Column, Generated, ManyToOne, JoinColumn } from "typeorm";
import { BaseEntity } from "@models/base-entity";
import { VARCHAR_STR } from "@utilities/constants";
import { CsvHeader } from './csv-header.entity';

@Entity()
export class CsvDetails extends BaseEntity {

  @Column({
    length: VARCHAR_STR.MAX_LENGTH
  })
  ccnumber: string;

  @Column({
    length: VARCHAR_STR.MAX_LENGTH
  })
  firstname: string;

  @Column({
    length: VARCHAR_STR.MAX_LENGTH
  })
  lastname: string;

  @Column({
    length: VARCHAR_STR.MAX_LENGTH
  })
  email: string;

  @ManyToOne(
    () => CsvHeader,
    header => header.details
  )
  header: CsvHeader | string;
}