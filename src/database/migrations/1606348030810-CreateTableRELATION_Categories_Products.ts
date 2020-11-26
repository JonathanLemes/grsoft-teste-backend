import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateTableRELATIONCategoriesProducts1606359030810 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "RELATION_Categories_Products",
            columns: [
                {
                    name: "id",
                    type: "integer",
                    unsigned: true,
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: "increment"
                },
                {
                    name: "categories_id",
                    type: "integer",
                    unsigned: true
                },
                {
                    name: "products_id",
                    type: "integer",
                    unsigned: true
                }
            ],
            foreignKeys: [
                {
                    name: "CategoriesId",
                    columnNames: ["categories_id"],
                    referencedTableName: "Categories",
                    referencedColumnNames: ["id"],
                    onUpdate: "CASCADE",
                    onDelete: "CASCADE"
                },
                {
                    name: "ProductsId",
                    columnNames: ["products_id"],
                    referencedTableName: "Products",
                    referencedColumnNames: ["id"],
                    onUpdate: "CASCADE",
                    onDelete: "CASCADE"
                }
            ]
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("RELATION_Categories_Products");
    }

}
