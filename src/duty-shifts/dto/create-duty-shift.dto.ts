import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateDutyShiftDto {
  @ApiProperty({ description: 'ID of the health unit', type: Number })
  @IsNumber()
  @IsNotEmpty()
  idHealthUnit: number;

  @ApiProperty({ description: 'Start time of the duty shift' })
  @IsString()
  @IsNotEmpty()
  timeInit: string;

  @ApiProperty({ description: 'End time of the duty shift' })
  @IsString()
  @IsNotEmpty()
  timeEnd: string;
}
