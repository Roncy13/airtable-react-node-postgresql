import {MigrationInterface, QueryRunner} from "typeorm";

export class AddDateUpdatedInHeader1613484729610 implements MigrationInterface {
    name = 'AddDateUpdatedInHeader1613484729610'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "csv_header" ADD "dateUpdated" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "csv_header" DROP COLUMN "dateUpdated"`, undefined);
    }

}
