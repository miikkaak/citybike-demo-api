import { MigrationInterface, QueryRunner } from "typeorm";

export class initialJourneys1672588246285 implements MigrationInterface {
    name = 'initialJourneys1672588246285'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "journeys" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "departure" TIMESTAMP NOT NULL, "returnTime" TIMESTAMP NOT NULL, "depStationId" character varying NOT NULL, "depStationName" character varying NOT NULL, "retStationId" character varying NOT NULL, "retStationName" character varying NOT NULL, "distance" integer NOT NULL, "duration" integer NOT NULL, CONSTRAINT "PK_94b31b067846c92b6811046c81e" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "journeys"`);
    }

}
