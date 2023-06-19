import { Module } from '@nestjs/common';
import { CreditService } from './credit.service';
import { CreditController } from './credit.controller';
import { ConfigModule } from '@nestjs/config';
import { CreditEntity } from './entities/credit.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from 'src/user/user.module';
import { UserEntity } from 'src/user/entities/user.entity';
import { PromotionEntity } from 'src/promotion/entities/promotion.entity';
import { EquivalenceEntity } from 'src/equivalence/entities/equivalence.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      CreditEntity,
      UserEntity,
      PromotionEntity,
      EquivalenceEntity,
    ]),
    ConfigModule,
    UserModule,
  ],
  controllers: [CreditController],
  providers: [CreditService],
})
export class CreditModule {}
