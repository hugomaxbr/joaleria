import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddCreateDateStorage1637740334455 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'storage',
      new TableColumn({
        name: 'created_at',
        type: 'timestamp',
        default: 'now()',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('storage', 'created_at');
  }
}
