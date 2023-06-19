import { ApiProperty } from '@nestjs/swagger';
import { IsDataURI, IsNumber, IsString, Min } from 'class-validator';

export class CreatePromotionDTO {
  @ApiProperty({
    description: 'The name of the promotion',
    type: 'string',
    example: 'Promoción de prueba',
  })
  @IsString()
  readonly name: string;

  @ApiProperty({
    description: 'The description of the promotion',
    type: 'string',
    example: 'Esta es una promoción de prueba',
  })
  @IsString()
  readonly description: string;

  @ApiProperty({
    description: 'The photo in base64 of the promotion',
    type: 'string',
    example:
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAIAQMAAAD+wSzIAAAABlBMVEX///+/v7+jQ3Y5AAAADklEQVQI12P4AIX8EAgALgAD/aNpbtEAAAAASUVORK5CYII',
  })
  @IsString()
  @IsDataURI()
  readonly photo_url: string;

  @ApiProperty({
    description: 'The amount of credits required to redeem the promotion',
    type: 'number',
    example: 100,
  })
  @IsNumber()
  @Min(1)
  readonly amount: number;
}
