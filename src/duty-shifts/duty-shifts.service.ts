import { Injectable } from '@nestjs/common';
import { CreateDutyShiftDto } from './dto/create-duty-shift.dto';
import { UpdateDutyShiftDto } from './dto/update-duty-shift.dto';

@Injectable()
export class DutyShiftsService {
  create(createDutyShiftDto: CreateDutyShiftDto) {
    return 'This action adds a new dutyShift';
  }

  findAll() {
    return `This action returns all dutyShifts`;
  }

  findOne(id: number) {
    return `This action returns a #${id} dutyShift`;
  }

  update(id: number, updateDutyShiftDto: UpdateDutyShiftDto) {
    return `This action updates a #${id} dutyShift`;
  }

  remove(id: number) {
    return `This action removes a #${id} dutyShift`;
  }
}
