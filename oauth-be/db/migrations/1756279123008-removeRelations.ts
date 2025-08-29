import { MigrationInterface, QueryRunner } from "typeorm";

export class RemoveRelations1756279123008 implements MigrationInterface {
    name = 'RemoveRelations1756279123008'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_provider" DROP CONSTRAINT "FK_559c5787bd99d04865c31f158a8"`);
        await queryRunner.query(`ALTER TABLE "user_provider" DROP COLUMN "user_id"`);
        await queryRunner.query(`ALTER TABLE "user_provider" ADD "provider_id" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user_provider" ALTER COLUMN "name" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user_provider" ALTER COLUMN "name" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "email" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "email" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user_provider" ALTER COLUMN "name" SET DEFAULT ''`);
        await queryRunner.query(`ALTER TABLE "user_provider" ALTER COLUMN "name" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user_provider" DROP COLUMN "provider_id"`);
        await queryRunner.query(`ALTER TABLE "user_provider" ADD "user_id" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user_provider" ADD CONSTRAINT "FK_559c5787bd99d04865c31f158a8" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
