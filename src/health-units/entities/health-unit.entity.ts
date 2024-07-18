import { Address } from 'src/addresses/entities/address.entity';
import { DutyShift } from 'src/duty-shifts/entities/duty-shift.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, OneToMany } from 'typeorm';


@Entity()
export class HealthUnit {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 255 })
    name: string;

    @OneToOne(() => Address, { cascade: true })
    @JoinColumn()
    address: Address;

    @OneToMany(() => DutyShift, dutyShift => dutyShift.healthUnit)
    dutyShifts: DutyShift[];
}
