import { Controller, Req, UseGuards } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { CreateTransactionDTO } from './dto/create-transaction.dto';
import { TransactionEntity } from './entities/transaction.entity';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import {
  Crud,
  CrudAuth,
  CrudController,
  Override,
  ParsedBody,
} from '@nestjsx/crud';
import { UserEntity } from 'src/user/entities/user.entity';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';

@ApiBearerAuth()
@ApiTags('Transactions')
@Crud({
  model: {
    type: TransactionEntity,
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
      user: { eager: true },
      promotion: { eager: true },
      'promotion.user': { eager: true, alias: 'seller' },
    },
  },
  routes: {
    only: ['getManyBase', 'getOneBase', 'createOneBase'],
  },
  dto: {
    create: CreateTransactionDTO,
  },
})
@UseGuards(JwtAuthGuard)
@Controller('transactions')
export class TransactionController
  implements CrudController<TransactionEntity>
{
  constructor(public service: TransactionService) {}

  @Override()
  public createOne(
    @Req() req: any,
    @ParsedBody() dto: CreateTransactionDTO,
  ): Promise<TransactionEntity> {
    return this.service.createTransaction(req.user, dto);
  }
}
