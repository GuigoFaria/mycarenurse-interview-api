import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateAddressDto } from '../..//addresses/dto/create-address.dto';

export class CreateHealthUnitDto {
  @ApiProperty({ description: 'Name of the health unit' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: 'Address of the health unit' })
  @ValidateNested()
  @Type(() => CreateAddressDto)
  address: CreateAddressDto;
}
