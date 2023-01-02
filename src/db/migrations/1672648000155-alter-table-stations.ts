import { MigrationInterface, QueryRunner } from "typeorm";

export class alterTableStations1672648000155 implements MigrationInterface {
    name = 'alterTableStations1672648000155'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "stations" DROP COLUMN "address"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "stations" ADD "address" character varying NOT NULL`);
    }

}
