import { Test, TestingModule } from '@nestjs/testing';
import { DutyShiftsService } from './duty-shifts.service';
import { Repository } from 'typeorm';
import { DutyShift } from './entities/duty-shift.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { HealthUnitsService } from '../health-units/health-units.service';
import { NursesService } from '../nurses/nurses.service';
import { CreateDutyShiftDto } from './dto/create-duty-shift.dto';
import { UpdateDutyShiftDto } from './dto/update-duty-shift.dto';

describe('DutyShiftsService', () => {
  let service: DutyShiftsService;
  let repository: Repository<DutyShift>;
  let healthUnitsService: HealthUnitsService;
  let nursesService: NursesService;

  const mockDutyShiftRepository = {
    save: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
    delete: jest.fn(),
  };

  const mockHealthUnitsService = {
    findOne: jest.fn(),
  };

  const mockNursesService = {
    findAllByIds: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DutyShiftsService,
        {
          provide: getRepositoryToken(DutyShift),
          useValue: mockDutyShiftRepository,
        },
        {
          provide: HealthUnitsService,
          useValue: mockHealthUnitsService,
        },
        {
          provide: NursesService,
          useValue: mockNursesService,
        },
      ],
    }).compile();

    service = module.get<DutyShiftsService>(DutyShiftsService);
    repository = module.get<Repository<DutyShift>>(
      getRepositoryToken(DutyShift),
    );
    healthUnitsService = module.get<HealthUnitsService>(HealthUnitsService);
    nursesService = module.get<NursesService>(NursesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new duty shift', async () => {
      const createDutyShiftDto: CreateDutyShiftDto = {
        idHealthUnit: 1,
        timeInit: '2024-07-18T08:00:00Z',
        timeEnd: '2024-07-18T12:00:00Z',
        description: 'Morning shift',
      };
      const healthUnit = { id: 1, name: 'Health Unit 1' };
      const savedDutyShift = { id: 1, ...createDutyShiftDto, healthUnit };

      mockHealthUnitsService.findOne.mockResolvedValue(healthUnit);
      mockDutyShiftRepository.save.mockResolvedValue(savedDutyShift);

      const result = await service.create(createDutyShiftDto);
      expect(result).toEqual(savedDutyShift);
      expect(mockHealthUnitsService.findOne).toHaveBeenCalledWith(
        createDutyShiftDto.idHealthUnit,
      );
      expect(mockDutyShiftRepository.save).toHaveBeenCalledWith({
        ...createDutyShiftDto,
        timeInit: new Date(createDutyShiftDto.timeInit),
        timeEnd: new Date(createDutyShiftDto.timeEnd),
        healthUnit,
      });
    });

    it('should throw an error if timeInit is after timeEnd', async () => {
      const createDutyShiftDto: CreateDutyShiftDto = {
        idHealthUnit: 1,
        timeInit: '2024-07-18T12:00:00Z',
        timeEnd: '2024-07-18T08:00:00Z',
        description: 'Morning shift',
      };

      await expect(service.create(createDutyShiftDto)).rejects.toThrow(
        'The timeInit must be before timeEnd',
      );
    });
  });

  describe('findAllByHealthUnit', () => {
    it('should return all duty shifts for a health unit', async () => {
      const healthUnit = { id: 1, name: 'Health Unit 1' };
      const dutyShifts = [
        { id: 1, healthUnit },
        { id: 2, healthUnit },
      ];

      mockHealthUnitsService.findOne.mockResolvedValue(healthUnit);
      mockDutyShiftRepository.find.mockResolvedValue(dutyShifts);

      const result = await service.findAllByHealthUnit(1);
      expect(result).toEqual(dutyShifts);
      expect(mockHealthUnitsService.findOne).toHaveBeenCalledWith(1);
      expect(mockDutyShiftRepository.find).toHaveBeenCalledWith({
        where: { healthUnit },
      });
    });
  });

  describe('update', () => {
    it('should update a duty shift with new nurses', async () => {
      const updateDutyShiftDto: UpdateDutyShiftDto = { nurseIds: [1, 2] };
      const dutyShift = { id: 1, nurses: [] };
      const allNurses = [
        { id: 1, name: 'Nurse 1' },
        { id: 2, name: 'Nurse 2' },
      ];

      mockDutyShiftRepository.findOne.mockResolvedValue(dutyShift);
      mockNursesService.findAllByIds.mockResolvedValue(allNurses);
      mockDutyShiftRepository.save.mockResolvedValue({
        ...dutyShift,
        nurses: allNurses,
      });

      const result = await service.update(1, updateDutyShiftDto);
      expect(result).toEqual({ ...dutyShift, nurses: allNurses });
      expect(mockDutyShiftRepository.findOne).toHaveBeenCalledWith({
        where: { id: 1 },
      });
      expect(mockNursesService.findAllByIds).toHaveBeenCalledWith(
        updateDutyShiftDto.nurseIds,
      );
      expect(mockDutyShiftRepository.save).toHaveBeenCalledWith({
        ...dutyShift,
        nurses: allNurses,
      });
    });
  });

  describe('remove', () => {
    it('should remove a duty shift', async () => {
      const deleteResult = { affected: 1 };
      mockDutyShiftRepository.delete.mockResolvedValue(deleteResult);

      const result = await service.remove(1);
      expect(result).toEqual(deleteResult);
      expect(mockDutyShiftRepository.delete).toHaveBeenCalledWith(1);
    });
  });

  describe('findAll', () => {
    it('should find all duty shifts', async () => {
      const healthUnit1 = { id: 1, name: 'Health Unit 1' };
      const healthUnit2 = { id: 2, name: 'Health Unit 1' };
      const dutyShifts = [
        { id: 1, healthUnit1 },
        { id: 2, healthUnit2 },
      ];

      mockDutyShiftRepository.find.mockResolvedValue(dutyShifts);
      const result = await service.findAll();
      expect(result).toEqual(dutyShifts);
      expect(mockDutyShiftRepository.find).toHaveBeenCalledWith({
        relations: ['healthUnit', 'nurses'],
      });
    });
  });
});
