import { Test, TestingModule } from '@nestjs/testing';
import { NursesService } from './nurses.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Nurse } from './entities/nurse.entity';
import { CreateNurseDto } from './dto/create-nurse.dto';
import { genSalt, hash } from 'bcrypt';

describe('NursesService', () => {
  let service: NursesService;
  let repository: Repository<Nurse>;

  const mockNurseRepository = {
    save: jest.fn(),
    findOne: jest.fn(),
    find: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        NursesService,
        {
          provide: getRepositoryToken(Nurse),
          useValue: mockNurseRepository,
        },
      ],
    }).compile();

    service = module.get<NursesService>(NursesService);
    repository = module.get<Repository<Nurse>>(getRepositoryToken(Nurse));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a nurse with hashed password', async () => {
      const createNurseDto: CreateNurseDto = {
        name: 'Test Nurse',
        email: 'test@nurse.com',
        password: 'password123',
        registrationCouncilNursing: '123456',
        stateCouncilNursing: 'Test State',
      };

      const salt = await genSalt();
      const hashedPassword = await hash(createNurseDto.password, salt);

      const saveNurse = { ...createNurseDto, password: hashedPassword };
      mockNurseRepository.save.mockResolvedValue(saveNurse);

      const result = await service.create(createNurseDto);

      expect(result).toEqual(saveNurse);
      expect(mockNurseRepository.save).toHaveBeenCalledWith({
        ...createNurseDto,
        password: expect.any(String),
      });
    });
  });

  describe('findByEmail', () => {
    it('should return a nurse by email', async () => {
      const nurse = {
        id: 1,
        email: 'test@nurse.com',
        password: 'hashedpassword',
        name: 'Test Nurse',
        registrationCouncilNursing: '123456',
        stateCouncilNursing: 'Test State',
      };

      mockNurseRepository.findOne.mockResolvedValue(nurse);

      const result = await service.findByEmail('test@nurse.com');

      expect(result).toEqual(nurse);
      expect(mockNurseRepository.findOne).toHaveBeenCalledWith({
        where: { email: 'test@nurse.com' },
        select: [
          'email',
          'password',
          'id',
          'name',
          'registrationCouncilNursing',
          'stateCouncilNursing',
        ],
      });
    });
  });

  describe('findAllByIds', () => {
    it('should return an array of nurses by IDs', async () => {
      const nurses = [
        { id: 1, name: 'Nurse 1' },
        { id: 2, name: 'Nurse 2' },
      ];

      mockNurseRepository.find.mockResolvedValue(nurses);

      const result = await service.findAllByIds([1, 2]);

      expect(result).toEqual(nurses);
      expect(mockNurseRepository.find).toHaveBeenCalledWith({
        where: { id: expect.anything() },
      });
    });
  });

  describe('remove', () => {
    it('should remove a nurse by ID', async () => {
      const deleteResult = { affected: 1 };

      mockNurseRepository.delete.mockResolvedValue(deleteResult);

      const result = await service.remove(1);

      expect(result).toEqual(deleteResult);
      expect(mockNurseRepository.delete).toHaveBeenCalledWith({ id: 1 });
    });
  });
});
