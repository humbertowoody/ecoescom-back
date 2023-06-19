import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { PromotionEntity } from 'src/promotion/entities/promotion.entity';
import { UserEntity } from 'src/user/entities/user.entity';
import {
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('transaction')
export class TransactionEntity {
  @ApiProperty({
    description: 'The ID of the Transaction',
    type: 'string',
    format: 'uuid',
  })
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  /**
   * Relations.
   */

  @ApiPropertyOptional({
    description: 'The user of the Transaction',
    type: () => UserEntity,
  })
  @ManyToOne((type) => UserEntity, (user: UserEntity) => user.transactions)
  public user?: UserEntity;

  @ApiProperty({
    description: 'The promotion of the Transaction',
    type: () => PromotionEntity,
  })
  @ManyToOne(
    (type) => PromotionEntity,
    (promotion: PromotionEntity) => promotion.transactions,
  )
  public promotion?: PromotionEntity;

  /**
   * Timestamp information.
   */

  @ApiProperty({
    description: 'The date of creation of the Equivalence',
    type: 'string',
    format: 'date-time',
  })
  @CreateDateColumn({ type: 'timestamptz', name: 'created_at' })
  public created_at: string;

  @ApiProperty({
    description: 'The date of update of the Equivalence',
    type: 'string',
    format: 'date-time',
  })
  @UpdateDateColumn({ type: 'timestamptz', name: 'updated_at' })
  public updated_at: string;
}
