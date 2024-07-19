import { Test, TestingModule } from '@nestjs/testing';
import { NursesService } from './nurses.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Nurse } from './entities/nurse.entity';

describe('NursesService', () => {
  let service: NursesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        NursesService,
        {
          provide: getRepositoryToken(Nurse),
          useValue: {
            save: jest.fn(),
            find: jest.fn(),
            findOne: jest.fn(),
            delete: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<NursesService>(NursesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
