import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateHealthUnitDto } from './dto/create-health-unit.dto';
import { Repository } from 'typeorm';
import { HealthUnit } from './entities/health-unit.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { AddressesService } from 'src/addresses/addresses.service';

@Injectable()
export class HealthUnitsService {
  constructor(
    @InjectRepository(HealthUnit)
    private readonly healthUnitsRepository: Repository<HealthUnit>,

    private readonly addressesService: AddressesService,
  ) {}
  create(createHealthUnitDto: CreateHealthUnitDto) {
    return this.healthUnitsRepository.save(createHealthUnitDto);
  }

  findAll() {
    return this.healthUnitsRepository.find({ relations: ['address'] });
  }

  async findOne(id: number) {
    const healthUnit = await this.healthUnitsRepository.findOne({
      where: { id },
      relations: ['address'],
    });

    if (!healthUnit) {
      throw new NotFoundException('Health Unit not found');
    }
    return healthUnit;
  }

  async remove(id: number) {
    const healthUnit = await this.healthUnitsRepository.findOne({
      where: { id },
      relations: ['address'],
    });

    if (!healthUnit) {
      throw new NotFoundException('Health Unit not found');
    }

    const deleteResult = await this.healthUnitsRepository.delete(healthUnit);

    await this.addressesService.remove(healthUnit.address.id);

    return deleteResult;
  }
}
