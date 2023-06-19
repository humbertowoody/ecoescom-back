import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { TransactionEntity } from 'src/transaction/entities/transaction.entity';
import { UserEntity } from 'src/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('promotion')
export class PromotionEntity {
  @ApiProperty({
    description: 'The ID of the Promotion',
    type: 'string',
    format: 'uuid',
  })
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  /**
   * Relationships.
   */

  @ApiPropertyOptional({
    description: 'The user that owns the promotion',
    type: () => UserEntity,
  })
  @ManyToOne((type) => UserEntity, (user: UserEntity) => user.promotions)
  public user?: UserEntity;

  @ApiPropertyOptional({
    description: 'The transactions of the Promotion',
    type: () => TransactionEntity,
  })
  @OneToMany(
    (type) => TransactionEntity,
    (transaction: TransactionEntity) => transaction.promotion,
  )
  public transactions?: TransactionEntity[];

  /**
   * Promotion information.
   */

  @ApiProperty({
    description: 'The name of the Promotion',
    type: 'string',
    example: 'Promoción 1',
  })
  @Column('text', { name: 'name' })
  name: string;

  @ApiProperty({
    description: 'The description of the Promotion',
    type: 'string',
    example: 'Promoción 1',
  })
  @Column('text', { name: 'description' })
  description: string;

  @ApiProperty({
    description: 'The photo url of the Promotion',
    type: 'string',
    example:
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAIAQMAAAD+wSzIAAAABlBMVEX///+/v7+jQ3Y5AAAADklEQVQI12P4AIX8EAgALgAD/aNpbtEAAAAASUVORK5CYII',
  })
  @Column('text', { name: 'photo_url' })
  photo_url: string;

  @ApiProperty({
    description: 'The amount of credits required to redeem the Promotion',
    type: 'number',
    example: 100,
  })
  @Column('int', { name: 'amount' })
  amount: number;

  /**
   * Status information
   */

  @ApiProperty({
    description: 'A flag indicating if the Promotion is enabled',
    type: 'boolean',
    example: true,
  })
  @Column('boolean', { name: 'enabled', default: true })
  enabled: boolean;

  /**
   * Timestamp information
   */

  @ApiProperty({
    description: 'The date of creation of the Promotion',
    type: 'string',
    format: 'date-time',
  })
  @CreateDateColumn({
    type: 'timestamptz',
    name: 'created_at',
    nullable: false,
  })
  created_at: Date;

  @ApiProperty({
    description: 'The date of the last update of the Promotion',
    type: 'string',
    format: 'date-time',
  })
  @UpdateDateColumn({
    type: 'timestamptz',
    name: 'updated_at',
    nullable: false,
  })
  updated_at: Date;
}
