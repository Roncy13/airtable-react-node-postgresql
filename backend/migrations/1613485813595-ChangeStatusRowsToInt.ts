import {MigrationInterface, QueryRunner} from "typeorm";

export class ChangeStatusRowsToInt1613485813595 implements MigrationInterface {
    name = 'ChangeStatusRowsToInt1613485813595'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "csv_header" ALTER COLUMN "jobId" SET DEFAULT null`, undefined);
        await queryRunner.query(`ALTER TABLE "csv_header" DROP COLUMN "rows"`, undefined);
        await queryRunner.query(`ALTER TABLE "csv_header" ADD "rows" bigint NOT NULL DEFAULT 0`, undefined);
        await queryRunner.query(`ALTER TABLE "csv_header" ALTER COLUMN "status" SET NOT NULL`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "csv_header" ALTER COLUMN "status" DROP NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "csv_header" DROP COLUMN "rows"`, undefined);
        await queryRunner.query(`ALTER TABLE "csv_header" ADD "rows" integer NOT NULL DEFAULT 0`, undefined);
        await queryRunner.query(`ALTER TABLE "csv_header" ALTER COLUMN "jobId" DROP DEFAULT`, undefined);
    }

}
