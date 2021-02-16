import {MigrationInterface, QueryRunner} from "typeorm";

export class AddDetailsHeaderLinkage1613487335181 implements MigrationInterface {
    name = 'AddDetailsHeaderLinkage1613487335181'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "csv_details" ADD "headerId" uuid`, undefined);
        await queryRunner.query(`ALTER TABLE "csv_details" ADD CONSTRAINT "FK_f0bf87ef8e71b48ad20083222d7" FOREIGN KEY ("headerId") REFERENCES "csv_header"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "csv_details" DROP CONSTRAINT "FK_f0bf87ef8e71b48ad20083222d7"`, undefined);
        await queryRunner.query(`ALTER TABLE "csv_details" DROP COLUMN "headerId"`, undefined);
    }

}
