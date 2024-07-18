import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateEntities1721342845553 implements MigrationInterface {
    name = 'CreateEntities1721342845553'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "address" ("id" SERIAL NOT NULL, "street" character varying(255) NOT NULL, "city" character varying(255) NOT NULL, "state" character varying(255) NOT NULL, "zipCode" character varying(20) NOT NULL, "number" character varying(10) NOT NULL, CONSTRAINT "PK_d92de1f82754668b5f5f5dd4fd5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "nurse" ("id" SERIAL NOT NULL, "name" character varying(255) NOT NULL, "registrationCouncilNursing" character varying(255) NOT NULL, "stateCouncilNursing" character varying(255) NOT NULL, "email" character varying(255) NOT NULL, "password" character varying(255) NOT NULL, CONSTRAINT "UQ_ad880c9af2632fd21aeb3f7b06a" UNIQUE ("email"), CONSTRAINT "PK_f48bb9f67d3ede34c65e7104d17" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "duty_shift" ("id" SERIAL NOT NULL, "timeInit" TIME NOT NULL, "timeEnd" TIME NOT NULL, "healthUnitId" integer, CONSTRAINT "PK_2b04e4cb539c6b5d3e195c4bf8c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "health_unit" ("id" SERIAL NOT NULL, "name" character varying(255) NOT NULL, "addressId" integer, CONSTRAINT "REL_eedbe4890079c1fde3199f94bb" UNIQUE ("addressId"), CONSTRAINT "PK_cc4e05b28a396eec768d6cfb867" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "duty_shift" ADD CONSTRAINT "FK_7d292330666fa6c230df9ebeb82" FOREIGN KEY ("healthUnitId") REFERENCES "health_unit"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "health_unit" ADD CONSTRAINT "FK_eedbe4890079c1fde3199f94bb2" FOREIGN KEY ("addressId") REFERENCES "address"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "health_unit" DROP CONSTRAINT "FK_eedbe4890079c1fde3199f94bb2"`);
        await queryRunner.query(`ALTER TABLE "duty_shift" DROP CONSTRAINT "FK_7d292330666fa6c230df9ebeb82"`);
        await queryRunner.query(`DROP TABLE "health_unit"`);
        await queryRunner.query(`DROP TABLE "duty_shift"`);
        await queryRunner.query(`DROP TABLE "nurse"`);
        await queryRunner.query(`DROP TABLE "address"`);
    }

}
