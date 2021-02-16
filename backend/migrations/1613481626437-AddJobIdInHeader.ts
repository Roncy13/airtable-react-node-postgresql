import {MigrationInterface, QueryRunner} from "typeorm";

export class AddJobIdInHeader1613481626437 implements MigrationInterface {
    name = 'AddJobIdInHeader1613481626437'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "csv_header" ADD "jobId" integer DEFAULT null`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "csv_header" DROP COLUMN "jobId"`, undefined);
    }

}
