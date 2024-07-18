import { Module } from '@nestjs/common';
import { NursesService } from './nurses.service';
import { NursesController } from './nurses.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Nurse } from './entities/nurse.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Nurse])],
  controllers: [NursesController],
  providers: [NursesService],
})
export class NursesModule {}
