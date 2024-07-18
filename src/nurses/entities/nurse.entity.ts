import { DutyShift } from 'src/duty-shifts/entities/duty-shift.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';

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

  @Column({ type: 'varchar', length: 255 })
  password: string;

  @ManyToMany(() => DutyShift, (dutyShift) => dutyShift.nurses)
  dutyShift: DutyShift[];
}
