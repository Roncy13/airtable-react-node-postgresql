import {MigrationInterface, QueryRunner} from "typeorm";

export class Change1613484007737 implements MigrationInterface {
    name = 'Change1613484007737'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "csv_header" DROP COLUMN "errorLogs"`, undefined);
        await queryRunner.query(`ALTER TABLE "csv_header" ADD "rows" integer NOT NULL DEFAULT 0`, undefined);
        await queryRunner.query(`ALTER TABLE "csv_header" ADD "message" text NOT NULL DEFAULT 'GENERATING'`, undefined);
        await queryRunner.query(`ALTER TABLE "csv_header" ALTER COLUMN "jobId" SET DEFAULT null`, undefined);
        await queryRunner.query(`ALTER TABLE "csv_header" ALTER COLUMN "status" SET DEFAULT null`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "csv_header" ALTER COLUMN "status" DROP DEFAULT`, undefined);
        await queryRunner.query(`ALTER TABLE "csv_header" ALTER COLUMN "jobId" DROP DEFAULT`, undefined);
        await queryRunner.query(`ALTER TABLE "csv_header" DROP COLUMN "message"`, undefined);
        await queryRunner.query(`ALTER TABLE "csv_header" DROP COLUMN "rows"`, undefined);
        await queryRunner.query(`ALTER TABLE "csv_header" ADD "errorLogs" text NOT NULL DEFAULT ''`, undefined);
    }

}
