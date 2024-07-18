import { Injectable } from '@nestjs/common';
import { CreateNurseDto } from './dto/create-nurse.dto';
import { Repository } from 'typeorm';
import { Nurse } from './entities/nurse.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class NursesService {
  constructor(
    @InjectRepository(Nurse)
    private readonly nursesRepository: Repository<Nurse>,
  ) {}
  create(createNurseDto: CreateNurseDto) {
    return this.nursesRepository.save(createNurseDto);
  }

  findOne(id: number) {
    return this.nursesRepository.findOneBy({ id });
  }

  remove(id: number) {
    return `This action removes a #${id} nurse`;
  }
}
