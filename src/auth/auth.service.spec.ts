import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { NursesService } from '../nurses/nurses.service';
import { JwtService } from '@nestjs/jwt';
import { UnauthorizedException } from '@nestjs/common';
import { Nurse } from '../nurses/entities/nurse.entity';
import { compare } from 'bcrypt';

jest.mock('bcrypt', () => ({
  compare: jest.fn(),
}));

describe('AuthService', () => {
  let service: AuthService;
  let nursesService: NursesService;
  let jwtService: JwtService;

  const mockNursesService = {
    findByEmail: jest.fn(),
  };

  const mockJwtService = {
    sign: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: NursesService, useValue: mockNursesService },
        { provide: JwtService, useValue: mockJwtService },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    nursesService = module.get<NursesService>(NursesService);
    jwtService = module.get<JwtService>(JwtService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('validateNurse', () => {
    it('should return nurse data without password if credentials are valid', async () => {
      const nurse = {
        id: 1,
        email: 'test@example.com',
        password: 'hashedPassword',
      };
      mockNursesService.findByEmail.mockResolvedValue(nurse);
      (compare as jest.Mock).mockResolvedValue(true);

      const result = await service.validateNurse(
        'test@example.com',
        'password',
      );

      expect(result).toEqual({
        id: 1,
        email: 'test@example.com',
        password: undefined,
      });
      expect(nursesService.findByEmail).toHaveBeenCalledWith(
        'test@example.com',
      );
      expect(compare).toHaveBeenCalledWith('password', 'hashedPassword');
    });

    it('should throw UnauthorizedException if nurse is not found', async () => {
      mockNursesService.findByEmail.mockResolvedValue(null);

      await expect(
        service.validateNurse('test@example.com', 'password'),
      ).rejects.toThrow(UnauthorizedException);
      expect(nursesService.findByEmail).toHaveBeenCalledWith(
        'test@example.com',
      );
    });

    it('should throw UnauthorizedException if password does not match', async () => {
      const nurse = {
        id: 1,
        email: 'test@example.com',
        password: 'hashedPassword',
      };
      mockNursesService.findByEmail.mockResolvedValue(nurse);
      (compare as jest.Mock).mockResolvedValue(false);

      await expect(
        service.validateNurse('test@example.com', 'password'),
      ).rejects.toThrow(UnauthorizedException);
      expect(nursesService.findByEmail).toHaveBeenCalledWith(
        'test@example.com',
      );
      expect(compare).toHaveBeenCalledWith('password', 'hashedPassword');
    });
  });

  describe('login', () => {
    it('should return an access token', async () => {
      const nurse: Nurse = {
        id: 1,
        email: 'test@example.com',
        password: 'hashedPassword',
        dutyShifts: [],
        name: 'John Doe',
        registrationCouncilNursing: '123456',
        stateCouncilNursing: 'SP',
      };
      const payload = { sub: nurse.id, email: nurse.email };
      mockJwtService.sign.mockReturnValue('access_token');

      const result = await service.login(nurse);

      expect(result).toEqual({ access_token: 'access_token' });
      expect(jwtService.sign).toHaveBeenCalledWith(payload);
    });
  });
});
