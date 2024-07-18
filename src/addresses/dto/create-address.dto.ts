import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class CreateAddressDto {
  @ApiProperty({ description: 'Street of the address' })
  @IsString()
  @IsNotEmpty()
  street: string;

  @ApiProperty({ description: 'City of the address' })
  @IsString()
  @IsNotEmpty()
  city: string;

  @ApiProperty({ description: 'State of the address' })
  @IsString()
  @IsNotEmpty()
  state: string;

  @ApiProperty({ description: 'Zip code of the address' })
  @IsString()
  @IsNotEmpty()
  zipCode: string;

  @ApiProperty({ description: 'Number of the address' })
  @IsString()
  @IsNotEmpty()
  number: string;
}
