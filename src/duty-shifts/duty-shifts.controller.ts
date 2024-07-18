import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DutyShiftsService } from './duty-shifts.service';
import { CreateDutyShiftDto } from './dto/create-duty-shift.dto';
import { UpdateDutyShiftDto } from './dto/update-duty-shift.dto';

@Controller('duty-shifts')
export class DutyShiftsController {
  constructor(private readonly dutyShiftsService: DutyShiftsService) {}

  @Post()
  create(@Body() createDutyShiftDto: CreateDutyShiftDto) {
    return this.dutyShiftsService.create(createDutyShiftDto);
  }

  @Get()
  findAll() {
    return this.dutyShiftsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.dutyShiftsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDutyShiftDto: UpdateDutyShiftDto) {
    return this.dutyShiftsService.update(+id, updateDutyShiftDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.dutyShiftsService.remove(+id);
  }
}
