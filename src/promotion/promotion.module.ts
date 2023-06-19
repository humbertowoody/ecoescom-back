import { Module } from '@nestjs/common';
import { PromotionService } from './promotion.service';
import { PromotionController } from './promotion.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PromotionEntity } from './entities/promotion.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PromotionEntity])],
  controllers: [PromotionController],
  providers: [PromotionService],
})
export class PromotionModule {}
