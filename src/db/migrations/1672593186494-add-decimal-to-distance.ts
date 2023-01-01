import { MigrationInterface, QueryRunner } from "typeorm";

export class addDecimalToDistance1672593186494 implements MigrationInterface {
    name = 'addDecimalToDistance1672593186494'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "journeys" DROP COLUMN "distance"`);
        await queryRunner.query(`ALTER TABLE "journeys" ADD "distance" numeric(10,2) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "journeys" DROP COLUMN "distance"`);
        await queryRunner.query(`ALTER TABLE "journeys" ADD "distance" integer NOT NULL`);
    }

}
