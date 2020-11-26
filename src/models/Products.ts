import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Products')
export default class Products {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    name: string;

    @Column()
    image_url: string;

    @Column()
    description: string;
}