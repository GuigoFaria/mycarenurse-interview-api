import { Test, TestingModule } from '@nestjs/testing';
import { DutyShiftsController } from './duty-shifts.controller';
import { DutyShiftsService } from './duty-shifts.service';
import { CreateDutyShiftDto } from './dto/create-duty-shift.dto';
import { UpdateDutyShiftDto } from './dto/update-duty-shift.dto';

describe('DutyShiftsController', () => {
  let controller: DutyShiftsController;
  let service: DutyShiftsService;

  const mockDutyShiftsService = {
    create: jest.fn(),
    findAllByHealthUnit: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DutyShiftsController],
      providers: [
        {
          provide: DutyShiftsService,
          useValue: mockDutyShiftsService,
        },
      ],
    }).compile();

    controller = module.get<DutyShiftsController>(DutyShiftsController);
    service = module.get<DutyShiftsService>(DutyShiftsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a duty shift', async () => {
      const createDutyShiftDto: CreateDutyShiftDto = {
        idHealthUnit: 1,
        timeInit: '2024-07-18T08:00:00Z',
        timeEnd: '2024-07-18T12:00:00Z',
        description: 'Morning shift',
      };
      const result = { id: 1, ...createDutyShiftDto };

      jest
        .spyOn(service, 'create')
        .mockImplementation(async () => result as any);

      expect(await controller.create(createDutyShiftDto)).toEqual(result);
      expect(service.create).toHaveBeenCalledWith(createDutyShiftDto);
    });
  });

  describe('findOne', () => {
    it('should find all duty shifts for a health unit', async () => {
      const result = [{ id: 1, healthUnit: { id: 1, name: 'Health Unit 1' } }];
      jest
        .spyOn(service, 'findAllByHealthUnit')
        .mockImplementation(async () => result as any);

      expect(await controller.findOne(1)).toEqual(result);
      expect(service.findAllByHealthUnit).toHaveBeenCalledWith(1);
    });
  });

  describe('update', () => {
    it('should update a duty shift', async () => {
      const updateDutyShiftDto: UpdateDutyShiftDto = { nurseIds: [1, 2] };
      const result = { id: 1, ...updateDutyShiftDto };

      jest
        .spyOn(service, 'update')
        .mockImplementation(async () => result as any);

      expect(await controller.update(1, updateDutyShiftDto)).toEqual(result);
      expect(service.update).toHaveBeenCalledWith(1, updateDutyShiftDto);
    });
  });

  describe('remove', () => {
    it('should remove a duty shift', async () => {
      const result = { affected: 1 };
      jest
        .spyOn(service, 'remove')
        .mockImplementation(async () => result as any);

      expect(await controller.remove(1)).toEqual(result);
      expect(service.remove).toHaveBeenCalledWith(1);
    });
  });
});
