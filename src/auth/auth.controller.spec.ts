import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';

describe('AuthController', () => {
  let authController: AuthController;
  let authService: AuthService;

  const mockAuthService = {
    login: jest.fn(),
  };

  const mockJwtService = {
    sign: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        { provide: AuthService, useValue: mockAuthService },
        { provide: JwtService, useValue: mockJwtService },
        Reflector,
        {
          provide: 'AuthGuard',
          useValue: {
            canActivate: (context: ExecutionContext) => {
              const request = context.switchToHttp().getRequest();
              request.user = { id: 1, email: 'test@example.com' };
              return true;
            },
          },
        },
      ],
    }).compile();

    authController = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(authController).toBeDefined();
  });

  describe('login', () => {
    it('should return an access token', async () => {
      const req = { user: { id: 1, email: 'test@example.com' } };
      const result = { access_token: 'token' };

      mockAuthService.login.mockResolvedValue(result);

      expect(await authController.login(req)).toEqual(result);
      expect(authService.login).toHaveBeenCalledWith(req.user);
    });

    it('should throw UnauthorizedException if no user is present in the request', async () => {
      const req = { user: null };

      await expect(authController.login(req)).rejects.toThrow(
        UnauthorizedException,
      );
    });
  });
});
