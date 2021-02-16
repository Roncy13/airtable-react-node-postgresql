import "reflect-metadata";
import { Entity, Column, Generated, OneToMany, JoinColumn } from "typeorm";
import { BaseEntity } from "@models/base-entity";
import { E_CsvJobStatus, E_CsvJobStatusMsg, VARCHAR_STR } from "@utilities/constants";
import { CsvDetails } from './csv-details.entity';

@Entity()
export class CsvHeader extends BaseEntity {

  @Column({
    length: VARCHAR_STR.MAX_LENGTH
  })
  filename: string;

  @Column({
    type: 'int',
    default: null
  })
  jobId: number;

  @Column({
    type: 'bigint',
    default: 0
  })
  rows: number;

  @Column({
    default: E_CsvJobStatus.GENERATING
  })
  status: number;

  @Column({
    type: 'text',
    default: E_CsvJobStatusMsg.GENERATING
  })
  message: string;

  @Column({
    type: 'timestamp',
    nullable: false,
    default: () => 'CURRENT_TIMESTAMP',
  })
  dateUpdated: Date;

  @OneToMany(
    () => CsvDetails,
    details => details.header,
    {
      cascade: true
    }
  )
  details: CsvDetails[]
}