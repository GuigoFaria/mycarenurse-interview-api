import { Injectable } from '@nestjs/common';
import { CreateHealthUnitDto } from './dto/create-health-unit.dto';
import { UpdateHealthUnitDto } from './dto/update-health-unit.dto';

@Injectable()
export class HealthUnitsService {
  create(createHealthUnitDto: CreateHealthUnitDto) {
    return 'This action adds a new healthUnit';
  }

  findAll() {
    return `This action returns all healthUnits`;
  }

  findOne(id: number) {
    return `This action returns a #${id} healthUnit`;
  }

  update(id: number, updateHealthUnitDto: UpdateHealthUnitDto) {
    return `This action updates a #${id} healthUnit`;
  }

  remove(id: number) {
    return `This action removes a #${id} healthUnit`;
  }
}
