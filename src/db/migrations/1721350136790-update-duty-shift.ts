import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateDutyShift1721350136790 implements MigrationInterface {
    name = 'UpdateDutyShift1721350136790'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "duty_shift" ADD "description" character varying(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "duty_shift" DROP COLUMN "description"`);
    }

}
