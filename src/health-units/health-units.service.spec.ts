import { Test, TestingModule } from '@nestjs/testing';
import { HealthUnitsService } from './health-units.service';
import { Repository } from 'typeorm';
import { HealthUnit } from './entities/health-unit.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { AddressesService } from '../addresses/addresses.service';
import { NotFoundException } from '@nestjs/common';

describe('HealthUnitsService', () => {
  let service: HealthUnitsService;
  let repository: Repository<HealthUnit>;
  let addressesService: AddressesService;

  const mockHealthUnitRepository = {
    save: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
    delete: jest.fn(),
  };

  const mockAddressesService = {
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        HealthUnitsService,
        {
          provide: getRepositoryToken(HealthUnit),
          useValue: mockHealthUnitRepository,
        },
        {
          provide: AddressesService,
          useValue: mockAddressesService,
        },
      ],
    }).compile();

    service = module.get<HealthUnitsService>(HealthUnitsService);
    repository = module.get<Repository<HealthUnit>>(
      getRepositoryToken(HealthUnit),
    );
    addressesService = module.get<AddressesService>(AddressesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new health unit', async () => {
      const createHealthUnitDto = {
        name: 'Unit 1',
        address: {
          street: 'Street 1',
          city: 'City 1',
          state: 'State 1',
          zipCode: '12345',
          number: '10',
        },
      };
      mockHealthUnitRepository.save.mockResolvedValue(createHealthUnitDto);

      expect(await service.create(createHealthUnitDto)).toEqual(
        createHealthUnitDto,
      );
      expect(mockHealthUnitRepository.save).toHaveBeenCalledWith(
        createHealthUnitDto,
      );
    });
  });

  describe('findAll', () => {
    it('should return an array of health units', async () => {
      const healthUnits = [{ id: 1, name: 'Unit 1', address: {} }];
      mockHealthUnitRepository.find.mockResolvedValue(healthUnits);

      expect(await service.findAll()).toEqual(healthUnits);
      expect(mockHealthUnitRepository.find).toHaveBeenCalledWith({
        relations: ['address'],
      });
    });
  });

  describe('findOne', () => {
    it('should return a single health unit', async () => {
      const healthUnit = { id: 1, name: 'Unit 1', address: {} };
      mockHealthUnitRepository.findOne.mockResolvedValue(healthUnit);

      expect(await service.findOne(1)).toEqual(healthUnit);
      expect(mockHealthUnitRepository.findOne).toHaveBeenCalledWith({
        where: { id: 1 },
        relations: ['address'],
      });
    });

    it('should throw NotFoundException if health unit is not found', async () => {
      mockHealthUnitRepository.findOne.mockResolvedValue(null);

      await expect(service.findOne(1)).rejects.toThrow(NotFoundException);
      expect(mockHealthUnitRepository.findOne).toHaveBeenCalledWith({
        where: { id: 1 },
        relations: ['address'],
      });
    });
  });

  describe('remove', () => {
    it('should remove a health unit', async () => {
      const healthUnit = { id: 1, name: 'Unit 1', address: { id: 1 } };
      mockHealthUnitRepository.findOne.mockResolvedValue(healthUnit);
      mockHealthUnitRepository.delete.mockResolvedValue({ affected: 1 });
      mockAddressesService.remove.mockResolvedValue({});

      expect(await service.remove(1)).toEqual({ affected: 1 });
      expect(mockHealthUnitRepository.findOne).toHaveBeenCalledWith({
        where: { id: 1 },
        relations: ['address'],
      });
      expect(mockHealthUnitRepository.delete).toHaveBeenCalledWith(healthUnit);
      expect(mockAddressesService.remove).toHaveBeenCalledWith(
        healthUnit.address.id,
      );
    });

    it('should throw NotFoundException if health unit is not found', async () => {
      mockHealthUnitRepository.findOne.mockResolvedValue(null);

      await expect(service.remove(1)).rejects.toThrow(NotFoundException);
      expect(mockHealthUnitRepository.findOne).toHaveBeenCalledWith({
        where: { id: 1 },
        relations: ['address'],
      });
    });
  });
});
