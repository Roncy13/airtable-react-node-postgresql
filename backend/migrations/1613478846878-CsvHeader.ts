import {MigrationInterface, QueryRunner} from "typeorm";

export class CsvHeader1613478846878 implements MigrationInterface {
    name = 'CsvHeader1613478846878'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "csv_header" ("id" uuid NOT NULL DEFAULT gen_random_uuid(), "dateCreated" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, "filename" character varying(255) NOT NULL, CONSTRAINT "PK_2de6b19199ced8ba60ff88f8303" PRIMARY KEY ("id"))`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`DROP TABLE "csv_header"`, undefined);
    }

}
