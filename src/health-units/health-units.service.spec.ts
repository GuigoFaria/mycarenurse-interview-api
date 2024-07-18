import { Test, TestingModule } from '@nestjs/testing';
import { HealthUnitsService } from './health-units.service';

describe('HealthUnitsService', () => {
  let service: HealthUnitsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HealthUnitsService],
    }).compile();

    service = module.get<HealthUnitsService>(HealthUnitsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
