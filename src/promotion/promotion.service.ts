import { ForbiddenException, Injectable, Logger } from '@nestjs/common';
import { CreatePromotionDTO } from './dto/create-promotion.dto';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { PromotionEntity } from './entities/promotion.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from 'src/user/entities/user.entity';

@Injectable()
export class PromotionService extends TypeOrmCrudService<PromotionEntity> {
  constructor(
    @InjectRepository(PromotionEntity)
    private readonly promotionRepository: Repository<PromotionEntity>,
  ) {
    super(promotionRepository);
  }

  /**
   * Create a promotion.
   * @param seller The seller.
   * @param createPromotionDto The promotion DTO.
   * @returns The created promotion.
   * @throws ForbiddenException if the seller is not a seller.
   * @throws ForbiddenException if the seller is a student.
   */
  public async createPromotion(
    seller: UserEntity,
    createPromotionDto: CreatePromotionDTO,
  ): Promise<PromotionEntity> {
    // Validate the seller is a seller and not a student.
    if (seller.role !== 'SELLER') {
      throw new ForbiddenException('Only sellers can create promotions');
    }

    // Create the Promotion.
    const newPromotion = this.promotionRepository.create({
      user: seller,
      ...createPromotionDto,
    });

    // Save the Promotion.
    return await this.promotionRepository.save(newPromotion);
  }
}
