import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateNurseDto {
  @ApiProperty({ description: 'Name of the nurse' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: 'Registration number with the nursing council' })
  @IsString()
  @IsNotEmpty()
  registrationCouncilNursing: string;

  @ApiProperty({ description: 'State of the nursing council registration' })
  @IsString()
  @IsNotEmpty()
  stateCouncilNursing: string;

  @ApiProperty({ description: 'Email of the nurse' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ description: 'Password for the nurse' })
  @IsString()
  @IsNotEmpty()
  password: string;
}
