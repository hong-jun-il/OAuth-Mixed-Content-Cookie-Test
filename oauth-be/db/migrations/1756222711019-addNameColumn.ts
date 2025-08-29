import { MigrationInterface, QueryRunner } from "typeorm";

export class AddNameColumn1756222711019 implements MigrationInterface {
    name = 'AddNameColumn1756222711019'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_provider" DROP CONSTRAINT "user_provider_user_id_fkey"`);
        await queryRunner.query(`ALTER TABLE "user_provider" DROP CONSTRAINT "user_provider_user_id_provider_key"`);
        await queryRunner.query(`ALTER TABLE "user_provider" ADD "name" character varying(50) NOT NULL DEFAULT ''`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "created_at" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "created_at" SET DEFAULT NOW()`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "updated_at" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "updated_at" SET DEFAULT NOW()`);
        await queryRunner.query(`ALTER TABLE "user_provider" ALTER COLUMN "created_at" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user_provider" ALTER COLUMN "created_at" SET DEFAULT NOW()`);
        await queryRunner.query(`ALTER TABLE "user_provider" ALTER COLUMN "updated_at" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user_provider" ALTER COLUMN "updated_at" SET DEFAULT NOW()`);
        await queryRunner.query(`ALTER TABLE "user_provider" ADD CONSTRAINT "FK_559c5787bd99d04865c31f158a8" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_provider" DROP CONSTRAINT "FK_559c5787bd99d04865c31f158a8"`);
        await queryRunner.query(`ALTER TABLE "user_provider" ALTER COLUMN "updated_at" SET DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "user_provider" ALTER COLUMN "updated_at" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user_provider" ALTER COLUMN "created_at" SET DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "user_provider" ALTER COLUMN "created_at" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "updated_at" SET DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "updated_at" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "created_at" SET DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "created_at" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user_provider" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "user_provider" ADD CONSTRAINT "user_provider_user_id_provider_key" UNIQUE ("user_id", "provider")`);
        await queryRunner.query(`ALTER TABLE "user_provider" ADD CONSTRAINT "user_provider_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}
