import { Test, TestingModule } from '@nestjs/testing';
import { DutyShiftsService } from './duty-shifts.service';

describe('DutyShiftsService', () => {
  let service: DutyShiftsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DutyShiftsService],
    }).compile();

    service = module.get<DutyShiftsService>(DutyShiftsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
