import { Controller, Req, UseGuards } from '@nestjs/common';
import { PromotionService } from './promotion.service';
import { CreatePromotionDTO } from './dto/create-promotion.dto';
import { UpdatePromotionDTO } from './dto/update-promotion.dto';
import { Crud, CrudController, Override, ParsedBody } from '@nestjsx/crud';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { PromotionEntity } from './entities/promotion.entity';

@ApiTags('Promotions')
@Crud({
  model: {
    type: PromotionEntity,
  },
  params: {
    id: {
      type: 'uuid',
      field: 'id',
      primary: true,
    },
  },
  query: {
    join: {
      user: {},
      transactions: {},
    },
  },
  routes: {
    only: ['getManyBase', 'getOneBase', 'createOneBase', 'updateOneBase'],
    createOneBase: {
      decorators: [ApiBearerAuth(), UseGuards(JwtAuthGuard)],
    },
    updateOneBase: {
      decorators: [ApiBearerAuth(), UseGuards(JwtAuthGuard)],
    },
  },
  dto: {
    create: CreatePromotionDTO,
    update: UpdatePromotionDTO,
  },
})
@Controller('promotions')
export class PromotionController implements CrudController<PromotionEntity> {
  constructor(public service: PromotionService) {}

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Override()
  public createOne(
    @Req() req: any,
    @ParsedBody() dto: CreatePromotionDTO,
  ): Promise<PromotionEntity> {
    return this.service.createPromotion(req.user, dto);
  }
}
