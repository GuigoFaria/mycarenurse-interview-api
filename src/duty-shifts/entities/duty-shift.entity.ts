import { HealthUnit } from '../../health-units/entities/health-unit.entity';
import { Nurse } from '../../nurses/entities/nurse.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  ManyToMany,
} from 'typeorm';

@Entity()
export class DutyShift {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => HealthUnit, (healthUnit) => healthUnit.dutyShifts)
  healthUnit: HealthUnit;

  @Column({ type: 'timestamptz' })
  timeInit: Date;

  @Column({ type: 'timestamptz' })
  timeEnd: Date;

  @Column({ type: 'varchar', length: 255 })
  description: string;

  @ManyToMany(() => Nurse, (nurse) => nurse.dutyShifts)
  nurses: Nurse[];
}
