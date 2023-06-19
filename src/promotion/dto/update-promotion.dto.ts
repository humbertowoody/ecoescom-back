import { PartialType } from '@nestjs/mapped-types';
import { CreatePromotionDTO } from './create-promotion.dto';
import { IsBoolean, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjsx/crud/lib/crud';

export class UpdatePromotionDTO extends PartialType(CreatePromotionDTO) {
  @ApiProperty({
    description: 'Enable or disable the promotion',
    required: false,
    type: Boolean,
  })
  @IsOptional()
  @IsBoolean()
  readonly enabled?: boolean;
}
