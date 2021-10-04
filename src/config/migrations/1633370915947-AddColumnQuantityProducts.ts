import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddColumnQuantityProducts1633370915947
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'storage',
      new TableColumn({
        name: 'product_quantity',
        type: 'int',
        default: 0,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('storage', 'product_quantity');
  }
}
