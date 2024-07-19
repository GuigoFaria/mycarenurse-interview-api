import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from './db/data-source';
import { NursesModule } from './nurses/nurses.module';
import { DutyShiftsModule } from './duty-shifts/duty-shifts.module';
import { HealthUnitsModule } from './health-units/health-units.module';
import { AddressesModule } from './addresses/addresses.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot(dataSourceOptions),
    NursesModule,
    DutyShiftsModule,
    AuthModule,
    HealthUnitsModule,
    AddressesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
