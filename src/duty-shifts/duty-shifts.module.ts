import { Module } from '@nestjs/common';
import { DutyShiftsService } from './duty-shifts.service';
import { DutyShiftsController } from './duty-shifts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DutyShift } from './entities/duty-shift.entity';
import { HealthUnitsModule } from 'src/health-units/health-units.module';
import { NursesModule } from 'src/nurses/nurses.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([DutyShift]),
    HealthUnitsModule,
    NursesModule,
  ],
  controllers: [DutyShiftsController],
  providers: [DutyShiftsService],
})
export class DutyShiftsModule {}
