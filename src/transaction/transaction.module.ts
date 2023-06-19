import { Module } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { TransactionController } from './transaction.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransactionEntity } from './entities/transaction.entity';
import { UserEntity } from 'src/user/entities/user.entity';
import { PromotionEntity } from 'src/promotion/entities/promotion.entity';
import { CreditEntity } from 'src/credit/entities/credit.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      TransactionEntity,
      UserEntity,
      PromotionEntity,
      CreditEntity,
    ]),
  ],
  controllers: [TransactionController],
  providers: [TransactionService],
})
export class TransactionModule {}
