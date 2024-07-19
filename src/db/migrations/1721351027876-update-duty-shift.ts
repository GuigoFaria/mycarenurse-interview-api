import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateDutyShift1721351027876 implements MigrationInterface {
    name = 'UpdateDutyShift1721351027876'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "duty_shift" DROP COLUMN "timeInit"`);
        await queryRunner.query(`ALTER TABLE "duty_shift" ADD "timeInit" TIMESTAMP WITH TIME ZONE NOT NULL`);
        await queryRunner.query(`ALTER TABLE "duty_shift" DROP COLUMN "timeEnd"`);
        await queryRunner.query(`ALTER TABLE "duty_shift" ADD "timeEnd" TIMESTAMP WITH TIME ZONE NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "duty_shift" DROP COLUMN "timeEnd"`);
        await queryRunner.query(`ALTER TABLE "duty_shift" ADD "timeEnd" TIME NOT NULL`);
        await queryRunner.query(`ALTER TABLE "duty_shift" DROP COLUMN "timeInit"`);
        await queryRunner.query(`ALTER TABLE "duty_shift" ADD "timeInit" TIME NOT NULL`);
    }

}
