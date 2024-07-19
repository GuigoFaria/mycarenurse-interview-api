import { Injectable } from '@nestjs/common';
import { CreateNurseDto } from './dto/create-nurse.dto';
import { In, Repository } from 'typeorm';
import { Nurse } from './entities/nurse.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { genSalt, hash } from 'bcrypt';

@Injectable()
export class NursesService {
  constructor(
    @InjectRepository(Nurse)
    private readonly nursesRepository: Repository<Nurse>,
  ) {}
  async create(createNurseDto: CreateNurseDto) {
    const salt = await genSalt();
    const hashedPassword = await hash(createNurseDto.password, salt);
    return this.nursesRepository.save({
      ...createNurseDto,
      password: hashedPassword,
    });
  }

  findByEmail(email: string) {
    return this.nursesRepository.findOne({
      where: { email },
      select: [
        'email',
        'password',
        'id',
        'name',
        'registrationCouncilNursing',
        'stateCouncilNursing',
      ],
    });
  }

  findAllByIds(ids: number[]) {
    return this.nursesRepository.find({ where: { id: In(ids) } });
  }

  remove(id: number) {
    return this.nursesRepository.delete({ id });
  }
}
