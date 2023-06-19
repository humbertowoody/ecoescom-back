import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, IsUUID } from 'class-validator';

export class CreateTransactionDTO {
  @ApiProperty({
    description: 'The email of the user for the transaction',
    type: String,
    format: 'email',
    example: 'batman@alumno.ipn.mx',
  })
  @IsString()
  @IsEmail()
  public user_email: string;

  @ApiProperty({
    description: 'The promotion id for the transaction',
    type: String,
    format: 'uuid',
  })
  @IsString()
  @IsUUID(4)
  public promotion_id: string;
}
