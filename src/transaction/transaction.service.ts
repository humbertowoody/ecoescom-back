import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Repository } from 'typeorm';
import { TransactionEntity } from './entities/transaction.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTransactionDTO } from './dto/create-transaction.dto';
import { UserEntity } from 'src/user/entities/user.entity';
import { PromotionEntity } from 'src/promotion/entities/promotion.entity';
import { CreditEntity } from 'src/credit/entities/credit.entity';

interface UserCredits {
  count: number;
  total: number;
  usable_credits: number;
  used_credits: number;
  reported_count: number;
  reported_total: number;
  used: number;
}

@Injectable()
export class TransactionService extends TypeOrmCrudService<TransactionEntity> {
  constructor(
    @InjectRepository(TransactionEntity)
    private readonly transactionRepository: Repository<TransactionEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(PromotionEntity)
    private readonly promotionRepository: Repository<PromotionEntity>,
    @InjectRepository(CreditEntity)
    private readonly creditRepository: Repository<CreditEntity>,
  ) {
    super(transactionRepository);
  }

  public async calculateUserCredits(user: UserEntity): Promise<UserCredits> {
    // Creamos el objeto resultado.
    const userCredits: UserCredits = {
      count: 0,
      total: 0,
      usable_credits: 0,
      used_credits: 0,
      reported_count: 0,
      reported_total: 0,
      used: 0,
    };

    // Obtenemos los créditos del usuario.
    const credits = await this.creditRepository.find({
      where: {
        user: user,
      },
      relations: ['equivalence'],
    });

    // Obtenemos las transacciones del usuario.
    const transactions = await this.transactionRepository.find({
      where: {
        user: user,
      },
      relations: ['promotion'],
    });

    // Procesamos los créditos.
    credits.forEach((credit) => {
      userCredits.count++;
      userCredits.total += credit.quantity * (credit.equivalence?.value || 0);
      if (credit.reported) {
        userCredits.reported_count++;
        userCredits.reported_total +=
          credit.quantity * (credit.equivalence?.value || 0);
      } else {
        userCredits.usable_credits++;
        userCredits.used_credits +=
          credit.quantity * (credit.equivalence?.value || 0);
      }
    });

    // Procesamos las transacciones.
    transactions.forEach((transaction) => {
      userCredits.used += transaction.promotion?.amount || 0;
    });

    return userCredits;
  }

  /**
   * Create a transaction.
   * @param seller The seller.
   * @param createTransactionDto The transaction DTO.
   * @returns The created transaction.
   * @throws BadRequestException if the student does not exist.
   * @throws BadRequestException if the promotion does not exist.
   * @throws BadRequestException if the seller does not own the promotion.
   * @throws BadRequestException if the student does not have enough credits.
   */
  public async createTransaction(
    seller: UserEntity,
    createTransactionDto: CreateTransactionDTO,
  ): Promise<TransactionEntity> {
    // Validate the student exists.
    const foundStudent: UserEntity = await this.userRepository.findOne({
      where: {
        email: createTransactionDto.user_email,
      },
      relations: ['credits'],
    });
    if (!foundStudent) {
      throw new BadRequestException('Student does not exist.');
    }

    // Validate the promotion exists.
    const foundPromotion: PromotionEntity =
      await this.promotionRepository.findOne({
        where: {
          id: createTransactionDto.promotion_id,
        },
        relations: ['user'],
      });
    if (!foundPromotion) {
      throw new BadRequestException('Promotion does not exist.');
    }

    // Validate the seller is not the student.
    if (foundStudent.id === seller.id) {
      throw new BadRequestException('Seller cannot be the student.');
    }

    // Validate the seller owns the promotion.
    if (foundPromotion.user?.id !== seller.id) {
      throw new BadRequestException('Seller does not own this promotion.');
    }

    // Validate the student has enough credits.
    const studentCredits: UserCredits = await this.calculateUserCredits(
      foundStudent,
    );

    if (studentCredits.total - studentCredits.used < foundPromotion.amount) {
      Logger.warn(
        `Student ${foundStudent.email} does not have enough credits.`,
        'TransactionService',
      );
      Logger.debug(studentCredits, 'TransactionService');
      throw new BadRequestException('Student does not have enough credits.');
    }

    // Create the transaction.
    const transaction = this.transactionRepository.create({
      user: foundStudent,
      promotion: foundPromotion,
    });

    return this.transactionRepository.save(transaction);
  }
}
