import { Test, TestingModule } from '@nestjs/testing';
import { HealthUnitsController } from './health-units.controller';
import { HealthUnitsService } from './health-units.service';
import { CreateHealthUnitDto } from './dto/create-health-unit.dto';

describe('HealthUnitsController', () => {
  let controller: HealthUnitsController;
  let service: HealthUnitsService;

  const mockHealthUnitsService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HealthUnitsController],
      providers: [
        {
          provide: HealthUnitsService,
          useValue: mockHealthUnitsService,
        },
      ],
    }).compile();

    controller = module.get<HealthUnitsController>(HealthUnitsController);
    service = module.get<HealthUnitsService>(HealthUnitsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a health unit', async () => {
      const createHealthUnitDto: CreateHealthUnitDto = {
        name: 'Health Unit 1',
        address: {
          street: 'Street 1',
          city: 'City 1',
          state: 'State 1',
          zipCode: '00000-000',
          number: '123',
        },
      };
      const result = { id: 1, ...createHealthUnitDto };

      jest
        .spyOn(service, 'create')
        .mockImplementation(async () => result as any);

      expect(await controller.create(createHealthUnitDto)).toEqual(result);
      expect(service.create).toHaveBeenCalledWith(createHealthUnitDto);
    });
  });

  describe('findAll', () => {
    it('should return an array of health units', async () => {
      const result = [{ id: 1, name: 'Health Unit 1' }];
      jest
        .spyOn(service, 'findAll')
        .mockImplementation(async () => result as any);

      expect(await controller.findAll()).toEqual(result);
      expect(service.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a single health unit', async () => {
      const result = { id: 1, name: 'Health Unit 1' };
      jest
        .spyOn(service, 'findOne')
        .mockImplementation(async () => result as any);

      expect(await controller.findOne('1')).toEqual(result);
      expect(service.findOne).toHaveBeenCalledWith(1);
    });
  });

  describe('remove', () => {
    it('should remove a health unit', async () => {
      const result = { affected: 1 };
      jest
        .spyOn(service, 'remove')
        .mockImplementation(async () => result as any);

      expect(await controller.remove('1')).toEqual(result);
      expect(service.remove).toHaveBeenCalledWith(1);
    });
  });
});
