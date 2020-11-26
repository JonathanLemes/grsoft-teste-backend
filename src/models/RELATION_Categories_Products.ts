import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('RELATION_Categories_Products')
export default class RELATION_Categories_Products {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    categories_id: number;

    @Column()
    products_id: number;
}