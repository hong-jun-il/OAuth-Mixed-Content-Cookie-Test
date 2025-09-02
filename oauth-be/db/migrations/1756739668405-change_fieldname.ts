import { MigrationInterface, QueryRunner } from "typeorm";

export class ChangeFieldname1756739668405 implements MigrationInterface {
    name = 'ChangeFieldname1756739668405'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_provider" RENAME COLUMN "name" TO "user_name"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_provider" RENAME COLUMN "user_name" TO "name"`);
    }

}
