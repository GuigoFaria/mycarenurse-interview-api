import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateRelations1721416801230 implements MigrationInterface {
    name = 'UpdateRelations1721416801230'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "nurse_duty_shifts" ("nurse_id" integer NOT NULL, "duty_shift_id" integer NOT NULL, CONSTRAINT "PK_99913d73964844913209e89dd43" PRIMARY KEY ("nurse_id", "duty_shift_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_2cd0b890f3dd8f56957bf07937" ON "nurse_duty_shifts" ("nurse_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_f27869de34096a3b2b5ae9c2f9" ON "nurse_duty_shifts" ("duty_shift_id") `);
        await queryRunner.query(`ALTER TABLE "nurse_duty_shifts" ADD CONSTRAINT "FK_2cd0b890f3dd8f56957bf07937f" FOREIGN KEY ("nurse_id") REFERENCES "nurse"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "nurse_duty_shifts" ADD CONSTRAINT "FK_f27869de34096a3b2b5ae9c2f99" FOREIGN KEY ("duty_shift_id") REFERENCES "duty_shift"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "nurse_duty_shifts" DROP CONSTRAINT "FK_f27869de34096a3b2b5ae9c2f99"`);
        await queryRunner.query(`ALTER TABLE "nurse_duty_shifts" DROP CONSTRAINT "FK_2cd0b890f3dd8f56957bf07937f"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_f27869de34096a3b2b5ae9c2f9"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_2cd0b890f3dd8f56957bf07937"`);
        await queryRunner.query(`DROP TABLE "nurse_duty_shifts"`);
    }

}
