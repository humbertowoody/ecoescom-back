import { ApiProperty } from '@nestjs/swagger';
import {
  IsDataURI,
  IsInt,
  IsNumber,
  IsString,
  IsUUID,
  Min,
} from 'class-validator';

export class CreateCreditDTO {
  @ApiProperty({
    description: 'The ID of the Equivalence used',
    type: 'string',
    format: 'uuid',
  })
  @IsString()
  @IsUUID(4)
  readonly equivalence_id: string;

  @ApiProperty({
    description: 'The quantity of the Equivalence used',
    type: 'number',
  })
  @IsNumber()
  @IsInt()
  @Min(1)
  readonly quantity: number;

  @ApiProperty({
    description: 'The URL of the photo of the credit',
    type: 'string',
    format: 'url',
    example:
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAIAQMAAAD+wSzIAAAABlBMVEX///+/v7+jQ3Y5AAAADklEQVQI12P4AIX8EAgALgAD/aNpbtEAAAAASUVORK5CYII',
  })
  @IsString()
  @IsDataURI()
  readonly photo_url: string;
}
