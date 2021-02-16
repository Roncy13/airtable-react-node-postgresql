import {MigrationInterface, QueryRunner} from "typeorm";

export class SampleTableUser1613477579554 implements MigrationInterface {
    name = 'SampleTableUser1613477579554'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT gen_random_uuid(), "dateCreated" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, "firstName" character varying(255) NOT NULL, "lastName" character varying(255) NOT NULL, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`DROP TABLE "user"`, undefined);
    }

}
