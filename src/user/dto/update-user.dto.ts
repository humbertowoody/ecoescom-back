import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsIn, IsOptional, IsString } from 'class-validator';

export class UpdateUserDTO {
  @ApiProperty({
    description: 'The apellido paterno of the User',
    default: 'López',
  })
  @IsOptional()
  @IsString()
  readonly lastname_1?: string;

  @ApiProperty({
    description: 'The apellido materno of the User',
    default: 'Pérez',
  })
  @IsOptional()
  @IsString()
  readonly lastname_2?: string;
}
