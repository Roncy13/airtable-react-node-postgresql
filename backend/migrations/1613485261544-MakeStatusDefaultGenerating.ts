import {MigrationInterface, QueryRunner} from "typeorm";

export class MakeStatusDefaultGenerating1613485261544 implements MigrationInterface {
    name = 'MakeStatusDefaultGenerating1613485261544'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "csv_header" ALTER COLUMN "status" SET DEFAULT 0`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "csv_header" ALTER COLUMN "status" DROP DEFAULT`, undefined);
    }

}
