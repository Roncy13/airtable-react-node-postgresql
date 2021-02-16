import {MigrationInterface, QueryRunner} from "typeorm";

export class AddStatusAndErrLogsInHeader1613481897951 implements MigrationInterface {
    name = 'AddStatusAndErrLogsInHeader1613481897951'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "csv_header" ADD "status" integer DEFAULT null`, undefined);
        await queryRunner.query(`ALTER TABLE "csv_header" ADD "errorLogs" text NOT NULL DEFAULT ''`, undefined);
        await queryRunner.query(`ALTER TABLE "csv_header" ALTER COLUMN "jobId" SET DEFAULT null`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "csv_header" ALTER COLUMN "jobId" DROP DEFAULT`, undefined);
        await queryRunner.query(`ALTER TABLE "csv_header" DROP COLUMN "errorLogs"`, undefined);
        await queryRunner.query(`ALTER TABLE "csv_header" DROP COLUMN "status"`, undefined);
    }

}
