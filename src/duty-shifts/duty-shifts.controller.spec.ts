import { Test, TestingModule } from '@nestjs/testing';
import { DutyShiftsController } from './duty-shifts.controller';
import { DutyShiftsService } from './duty-shifts.service';

describe('DutyShiftsController', () => {
  let controller: DutyShiftsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DutyShiftsController],
      providers: [DutyShiftsService],
    }).compile();

    controller = module.get<DutyShiftsController>(DutyShiftsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
