import { DutyShift } from '../../duty-shifts/entities/duty-shift.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
} from 'typeorm';

@Entity()
export class Nurse {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'varchar', length: 6 })
  registrationCouncilNursing: string;

  @Column({ type: 'varchar', length: 2 })
  stateCouncilNursing: string;

  @Column({ type: 'varchar', length: 255, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 255, select: false })
  password: string;

  @ManyToMany(() => DutyShift, (dutyShift) => dutyShift.nurses)
  @JoinTable({
    name: 'nurse_duty_shifts', // nome da tabela de junção
    joinColumn: { name: 'nurse_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'duty_shift_id', referencedColumnName: 'id' },
  })
  dutyShifts: DutyShift[];
}
