import { HealthUnit } from 'src/health-units/entities/health-unit.entity';
import { Nurse } from 'src/nurses/entities/nurse.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, ManyToMany } from 'typeorm';


@Entity()
export class DutyShift {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => HealthUnit, healthUnit => healthUnit.dutyShifts)
    healthUnit: HealthUnit;

    @Column({ type: 'time' })
    timeInit: string;

    @Column({ type: 'time' })
    timeEnd: string;

    @ManyToMany(() => Nurse, nurse => nurse.dutyShift)
    nurses: Nurse[];
}
