import { Controller, Param, Post, Req, UseGuards } from '@nestjs/common';
import { CreditService } from './credit.service';
import { CreateCreditDTO } from './dto/create-credit.dto';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { Crud, CrudController, Override, ParsedBody } from '@nestjsx/crud';
import { CreditEntity } from './entities/credit.entity';

@ApiTags('Credits')
@Crud({
  model: {
    type: CreditEntity,
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
      equivalence: {
        eager: true,
      },
      user: {},
    },
  },
  routes: {
    only: ['getManyBase', 'getOneBase', 'createOneBase'],
  },
  dto: {
    create: CreateCreditDTO,
  },
})
@Controller('credits')
export class CreditController implements CrudController<CreditEntity> {
  constructor(public service: CreditService) {}

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Override()
  public createOne(
    @Req() req: any,
    @ParsedBody() dto: CreateCreditDTO,
  ): Promise<CreditEntity> {
    return this.service.createCredit(req.user, dto);
  }

  @Post('/:id/report')
  @ApiOperation({
    summary: 'Report a credit for an administrator to validate',
    description:
      'Report a credit for an administrator to validate. If the `User` **does not exist** or if invalid credentials are provided, a `401 Unauthorized` error will be sent.',
  })
  @ApiOkResponse({ description: 'Reported', type: CreditEntity })
  public reportCredit(@Param('id') id: string): Promise<CreditEntity> {
    return this.service.reportCredit(id);
  }
}
