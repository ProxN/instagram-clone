import { MigrationInterface, QueryRunner } from 'typeorm';

export class initial1643469663617 implements MigrationInterface {
  name = 'initial1643469663617';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "bookmark" DROP COLUMN "what"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "bookmark" ADD "what" character varying`
    );
  }
}
