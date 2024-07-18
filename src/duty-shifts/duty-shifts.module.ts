import { Module } from '@nestjs/common';
import { DutyShiftsService } from './duty-shifts.service';
import { DutyShiftsController } from './duty-shifts.controller';

@Module({
  controllers: [DutyShiftsController],
  providers: [DutyShiftsService],
})
export class DutyShiftsModule {}
