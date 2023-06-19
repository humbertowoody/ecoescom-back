import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginDTO {
  @ApiProperty({
    description: 'The email of the User',
    type: 'string',
    example: 'hola@alumno.ipn.mx',
  })
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  public username: string;

  @ApiProperty({
    description: 'The password of the User',
    type: 'string',
    format: 'password',
    example: '12345678',
  })
  @IsNotEmpty()
  @IsString()
  public password: string;
}
