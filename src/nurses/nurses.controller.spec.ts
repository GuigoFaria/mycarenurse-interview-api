import { Test, TestingModule } from '@nestjs/testing';
import { NursesController } from './nurses.controller';
import { NursesService } from './nurses.service';
import { CreateNurseDto } from './dto/create-nurse.dto';

describe('NursesController', () => {
  let controller: NursesController;
  let service: NursesService;

  const mockNursesService = {
    create: jest
      .fn()
      .mockImplementation((dto: CreateNurseDto) =>
        Promise.resolve({ id: 1, ...dto }),
      ),
    remove: jest
      .fn()
      .mockImplementation((id: number) => Promise.resolve({ affected: 1 })),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NursesController],
      providers: [
        {
          provide: NursesService,
          useValue: mockNursesService,
        },
      ],
    }).compile();

    controller = module.get<NursesController>(NursesController);
    service = module.get<NursesService>(NursesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a nurse', async () => {
      const dto: CreateNurseDto = {
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password123',
        registrationCouncilNursing: '12345',
        stateCouncilNursing: 'NY',
      };

      expect(await controller.create(dto)).toEqual({ id: 1, ...dto });
      expect(service.create).toHaveBeenCalledWith(dto);
    });
  });

  describe('remove', () => {
    it('should remove a nurse', async () => {
      const id = 1;
      expect(await controller.remove(id)).toEqual({ affected: 1 });
      expect(service.remove).toHaveBeenCalledWith(id);
    });
  });
});
