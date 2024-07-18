import { Test, TestingModule } from '@nestjs/testing';
import { HealthUnitsController } from './health-units.controller';
import { HealthUnitsService } from './health-units.service';

describe('HealthUnitsController', () => {
  let controller: HealthUnitsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HealthUnitsController],
      providers: [HealthUnitsService],
    }).compile();

    controller = module.get<HealthUnitsController>(HealthUnitsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
