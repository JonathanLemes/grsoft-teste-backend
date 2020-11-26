import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Users')
export default class Users {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    password: string;
}