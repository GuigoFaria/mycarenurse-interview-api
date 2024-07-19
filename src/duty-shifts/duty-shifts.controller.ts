import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
  UseGuards,
} from '@nestjs/common';
import { DutyShiftsService } from './duty-shifts.service';
import { CreateDutyShiftDto } from './dto/create-duty-shift.dto';
import { UpdateDutyShiftDto } from './dto/update-duty-shift.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('duty-shifts')
export class DutyShiftsController {
  constructor(private readonly dutyShiftsService: DutyShiftsService) {}

  @Post()
  create(@Body() createDutyShiftDto: CreateDutyShiftDto) {
    return this.dutyShiftsService.create(createDutyShiftDto);
  }

  @Get('/health-units/:healthUnitId')
  findOne(@Param('healthUnitId') id: number) {
    return this.dutyShiftsService.findAllByHealthUnit(id);
  }

  @Put(':id')
  @UseGuards(AuthGuard('jwt'))
  update(
    @Param('id') id: number,
    @Body() updateDutyShiftDto: UpdateDutyShiftDto,
  ) {
    return this.dutyShiftsService.update(id, updateDutyShiftDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.dutyShiftsService.remove(id);
  }
}
