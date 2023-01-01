import { MigrationInterface, QueryRunner } from "typeorm";

export class createTableStations1672609355350 implements MigrationInterface {
    name = 'createTableStations1672609355350'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "stations" ("dbId" uuid NOT NULL DEFAULT uuid_generate_v4(), "fid" integer NOT NULL, "id" integer NOT NULL, "nameFI" character varying NOT NULL, "nameSWE" character varying NOT NULL, "name" character varying NOT NULL, "addressFI" character varying NOT NULL, "addressSWE" character varying NOT NULL, "address" character varying NOT NULL, "city" character varying NOT NULL, "citySWE" character varying NOT NULL, "capacity" integer NOT NULL, "lon" integer NOT NULL, "lat" integer NOT NULL, CONSTRAINT "PK_3dc9375dfeff30db75232fb78d1" PRIMARY KEY ("dbId"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "stations"`);
    }

}
