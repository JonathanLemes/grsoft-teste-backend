import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Categories')
export default class Categories {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    name: string;

    @Column()
    url: string;
}