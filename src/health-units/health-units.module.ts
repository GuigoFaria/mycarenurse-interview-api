import { Module } from '@nestjs/common';
import { HealthUnitsService } from './health-units.service';
import { HealthUnitsController } from './health-units.controller';

@Module({
  controllers: [HealthUnitsController],
  providers: [HealthUnitsService],
})
export class HealthUnitsModule {}
