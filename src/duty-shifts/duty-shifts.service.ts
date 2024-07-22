import { Injectable } from '@nestjs/common';
import { CreateDutyShiftDto } from './dto/create-duty-shift.dto';
import { UpdateDutyShiftDto } from './dto/update-duty-shift.dto';
import { Repository } from 'typeorm';
import { DutyShift } from './entities/duty-shift.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { HealthUnitsService } from '../health-units/health-units.service';
import { NursesService } from '../nurses/nurses.service';

@Injectable()
export class DutyShiftsService {
  constructor(
    @InjectRepository(DutyShift)
    private readonly dutyShiftsRepository: Repository<DutyShift>,
    private readonly healthUnitsService: HealthUnitsService,
    private readonly nursesService: NursesService,
  ) {}
  async create(createDutyShiftDto: CreateDutyShiftDto) {
    const healthUnit = await this.healthUnitsService.findOne(
      createDutyShiftDto.idHealthUnit,
    );
    const timeInit = new Date(createDutyShiftDto.timeInit);
    const timeEnd = new Date(createDutyShiftDto.timeEnd);
    if (timeInit > timeEnd) {
      throw new Error('The timeInit must be before timeEnd');
    }

    const dutyShift = this.dutyShiftsRepository.save({
      ...createDutyShiftDto,
      timeInit: timeInit,
      timeEnd: timeEnd,
      healthUnit,
    });

    return dutyShift;
  }

  async findAll() {
    return this.dutyShiftsRepository.find({
      relations: ['healthUnit', 'nurses'],
    });
  }

  async findAllByHealthUnit(id: number) {
    const healthUnit = await this.healthUnitsService.findOne(id);

    return this.dutyShiftsRepository.find({
      where: { healthUnit },
    });
  }

  async update(id: number, updateDutyShiftDto: UpdateDutyShiftDto) {
    const dutyShift = await this.dutyShiftsRepository.findOne({
      where: { id },
    });

    const allNurses = await this.nursesService.findAllByIds(
      updateDutyShiftDto.nurseIds,
    );

    dutyShift.nurses = allNurses;
    return this.dutyShiftsRepository.save(dutyShift);
  }

  remove(id: number) {
    return this.dutyShiftsRepository.delete(id);
  }
}
