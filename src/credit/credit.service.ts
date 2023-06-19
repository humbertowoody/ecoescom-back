import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCreditDTO } from './dto/create-credit.dto';
import { PromotionEntity } from 'src/promotion/entities/promotion.entity';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { CreditEntity } from './entities/credit.entity';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/user/entities/user.entity';
import { EquivalenceEntity } from 'src/equivalence/entities/equivalence.entity';
import { uniq } from 'lodash';

@Injectable()
export class CreditService extends TypeOrmCrudService<CreditEntity> {
  constructor(
    @InjectRepository(CreditEntity)
    private creditRepository: Repository<CreditEntity>,
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    @InjectRepository(PromotionEntity)
    private promotionRepository: Repository<PromotionEntity>,
    @InjectRepository(EquivalenceEntity)
    private equivalenceRepository: Repository<EquivalenceEntity>,
    private readonly configService: ConfigService,
  ) {
    super(creditRepository);
  }

  public async reportCredit(creditId: string): Promise<CreditEntity> {
    // Obtenemos el crédito.
    const credit = await this.creditRepository.findOne({
      id: creditId,
    });
    if (!credit) {
      throw new BadRequestException('Credit not found');
    }

    credit.reported = true;
    credit.reported_at = new Date();

    return this.creditRepository.save(credit);
  }

  /**
   * Create a credit.
   * @param user The user.
   * @param createCreditDto The credit DTO.
   * @returns The created credit.
   */
  public async createCredit(
    user: UserEntity,
    createCreditDto: CreateCreditDTO,
  ): Promise<CreditEntity> {
    // Validate the equivalence.
    const foundEquivalence = await this.equivalenceRepository.findOne({
      id: createCreditDto.equivalence_id,
    });
    if (!foundEquivalence || !foundEquivalence.enabled) {
      throw new BadRequestException('Equivalence not found or disabled');
    }

    // Validate the quantity.
    if (createCreditDto.quantity < foundEquivalence.min) {
      throw new BadRequestException(
        `The quantity must be at least ${foundEquivalence.min}.`,
      );
    }
    if (createCreditDto.quantity > foundEquivalence.max) {
      throw new BadRequestException(
        `The quantity must be at most ${foundEquivalence.max}.`,
      );
    }

    // Create the credit.
    const credit = new CreditEntity();
    credit.user = user;
    credit.equivalence = foundEquivalence;
    credit.quantity = createCreditDto.quantity;
    credit.photo_url = createCreditDto.photo_url;
    return this.creditRepository.save(credit);
  }
}
