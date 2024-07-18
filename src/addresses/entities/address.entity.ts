import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Address {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 255 })
    street: string;

    @Column({ type: 'varchar', length: 255 })
    city: string;

    @Column({ type: 'varchar', length: 255 })
    state: string;

    @Column({ type: 'varchar', length: 20 })
    zipCode: string;

    @Column({ type: 'varchar', length: 10 })
    number: string;
}
