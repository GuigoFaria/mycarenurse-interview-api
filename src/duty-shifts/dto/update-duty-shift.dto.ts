import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateDutyShiftDto } from './create-duty-shift.dto';
import { IsNumber, IsNotEmpty } from 'class-validator';

export class UpdateDutyShiftDto {
  @ApiProperty({ description: 'Ids for nurses', type: Number })
  @IsNumber()
  @IsNotEmpty()
  nurseIds: number[];
}
