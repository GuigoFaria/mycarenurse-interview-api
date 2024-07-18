import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateNurse1721344887933 implements MigrationInterface {
    name = 'UpdateNurse1721344887933'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "nurse" DROP COLUMN "registrationCouncilNursing"`);
        await queryRunner.query(`ALTER TABLE "nurse" ADD "registrationCouncilNursing" character varying(6) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "nurse" DROP COLUMN "stateCouncilNursing"`);
        await queryRunner.query(`ALTER TABLE "nurse" ADD "stateCouncilNursing" character varying(2) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "nurse" DROP COLUMN "stateCouncilNursing"`);
        await queryRunner.query(`ALTER TABLE "nurse" ADD "stateCouncilNursing" character varying(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "nurse" DROP COLUMN "registrationCouncilNursing"`);
        await queryRunner.query(`ALTER TABLE "nurse" ADD "registrationCouncilNursing" character varying(255) NOT NULL`);
    }

}
