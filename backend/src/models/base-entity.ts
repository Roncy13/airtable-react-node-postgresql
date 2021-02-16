import  "reflect-metadata";
import { PrimaryGeneratedColumn, Column} from "typeorm";

export class BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
      type: 'timestamp',
      nullable: false,
      default: () => 'CURRENT_TIMESTAMP'
    })
    dateCreated: string;
}
