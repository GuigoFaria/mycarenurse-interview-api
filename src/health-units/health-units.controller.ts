import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { HealthUnitsService } from './health-units.service';
import { CreateHealthUnitDto } from './dto/create-health-unit.dto';
import { UpdateHealthUnitDto } from './dto/update-health-unit.dto';

@Controller('health-units')
export class HealthUnitsController {
  constructor(private readonly healthUnitsService: HealthUnitsService) {}

  @Post()
  create(@Body() createHealthUnitDto: CreateHealthUnitDto) {
    return this.healthUnitsService.create(createHealthUnitDto);
  }

  @Get()
  findAll() {
    return this.healthUnitsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.healthUnitsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateHealthUnitDto: UpdateHealthUnitDto) {
    return this.healthUnitsService.update(+id, updateHealthUnitDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.healthUnitsService.remove(+id);
  }
}
