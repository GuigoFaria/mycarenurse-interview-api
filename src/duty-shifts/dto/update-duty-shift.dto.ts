import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateDutyShiftDto } from './create-duty-shift.dto';
import { IsNotEmpty, IsArray } from 'class-validator';

export class UpdateDutyShiftDto {
  @ApiProperty({ description: 'Ids for nurses', type: Number })
  @IsArray()
  @IsNotEmpty()
  nurseIds: number[];
}
