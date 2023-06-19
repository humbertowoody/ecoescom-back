import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
} from 'class-validator';

export class SignupDTO {
  @ApiProperty({
    description: 'The email address of the User',
    type: 'string',
    example: 'batman@alumno.ipn.mx',
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(80)
  @IsEmail()
  public email: string;

  @ApiProperty({
    description: 'The password of the User',
    type: 'string',
    format: 'password',
    example: '12345678',
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(80)
  public password: string;

  @ApiProperty({
    description: 'The first name of the User',
    type: 'string',
    example: 'Juan',
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(80)
  @Matches(/[a-zA-ZñÑáéíóúÁÉÍÓÚ\s]+/)
  public firstname: string;

  @ApiProperty({
    description: 'The lastname (apellido paterno) of the User',
    type: 'string',
    example: 'López',
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(80)
  @Matches(/[a-zA-ZñÑáéíóúÁÉÍÓÚ\s]+/)
  public lastname_1: string;

  @ApiProperty({
    description: 'The lastname 2 (apellido materno) of the User',
    type: 'string',
    example: 'Pérez',
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(80)
  @Matches(/[a-zA-ZñÑáéíóúÁÉÍÓÚ\s]+/)
  public lastname_2: string;

  @ApiProperty({
    description: 'The student id of the User',
    type: 'string',
    example: '2019630000',
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(10)
  @Matches(/[0-9]+/)
  public student_id: string;
}
