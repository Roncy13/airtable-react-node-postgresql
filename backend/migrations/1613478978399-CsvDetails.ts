import {MigrationInterface, QueryRunner} from "typeorm";

export class CsvDetails1613478978399 implements MigrationInterface {
    name = 'CsvDetails1613478978399'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "csv_details" ("id" uuid NOT NULL DEFAULT gen_random_uuid(), "dateCreated" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, "ccnumber" character varying(255) NOT NULL, "firstname" character varying(255) NOT NULL, "lastname" character varying(255) NOT NULL, "email" character varying(255) NOT NULL, CONSTRAINT "PK_a70f1788b70cb857db0cbb14e10" PRIMARY KEY ("id"))`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`DROP TABLE "csv_details"`, undefined);
    }

}
