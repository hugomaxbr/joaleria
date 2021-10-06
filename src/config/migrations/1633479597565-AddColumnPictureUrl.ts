import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddColumnPictureUrl1633479597565 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'products',
      new TableColumn({
        name: 'picture_url',
        type: 'varchar',
        isNullable: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('products', 'picture_url');
  }
}
