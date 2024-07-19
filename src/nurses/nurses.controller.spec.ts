import { Test, TestingModule } from '@nestjs/testing';
import { NursesController } from './nurses.controller';
import { NursesService } from './nurses.service';

const mockHealthUnitsService = {
  findAll: jest.fn(),
};

describe('NursesController', () => {
  let controller: NursesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NursesController],
      providers: [
        {
          provide: NursesService,
          useValue: mockHealthUnitsService,
        },
      ],
    }).compile();

    controller = module.get<NursesController>(NursesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
