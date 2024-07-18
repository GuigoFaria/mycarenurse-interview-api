import { Module } from '@nestjs/common';
import { HealthUnitsService } from './health-units.service';
import { HealthUnitsController } from './health-units.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HealthUnit } from './entities/health-unit.entity';
import { AddressesModule } from '../addresses/addresses.module';

@Module({
  imports: [TypeOrmModule.forFeature([HealthUnit]), AddressesModule],
  controllers: [HealthUnitsController],
  providers: [HealthUnitsService],
})
export class HealthUnitsModule {}
