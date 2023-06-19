import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { compare, hash } from 'bcryptjs';
import { Exclude } from 'class-transformer';
import { CreditEntity } from 'src/credit/entities/credit.entity';
import { PromotionEntity } from 'src/promotion/entities/promotion.entity';
import { TransactionEntity } from 'src/transaction/entities/transaction.entity';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('user')
export class UserEntity {
  @ApiProperty({
    description: 'The ID of the User',
    type: 'string',
    format: 'uuid',
  })
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  /**
   * Relationships.
   */

  @ApiPropertyOptional({
    description: 'The credits of the User',
    type: () => CreditEntity,
  })
  @OneToMany((type) => CreditEntity, (credit: CreditEntity) => credit.user)
  public credits?: CreditEntity[];

  @ApiPropertyOptional({
    description: 'The promotions of the User',
    type: () => PromotionEntity,
  })
  @OneToMany(
    (type) => PromotionEntity,
    (promotion: PromotionEntity) => promotion.user,
  )
  public promotions?: PromotionEntity[];

  @ApiPropertyOptional({
    description: 'The transactions of the User',
    type: () => TransactionEntity,
  })
  @OneToMany(
    (type) => TransactionEntity,
    (transaction: TransactionEntity) => transaction.user,
  )
  public transactions?: TransactionEntity[];

  /**
   * Personal information.
   */

  @ApiProperty({
    description: 'The email of the User',
    type: 'string',
    format: 'email',
  })
  @Column({ unique: true, nullable: false, type: 'text' })
  public email: string;

  @ApiProperty({
    description: 'The número de boleta of the User',
    type: 'string',
    example: '2019630000',
  })
  @Column('text', { name: 'student_id' })
  public student_id: string;

  @ApiProperty({
    description: 'The first name of the User',
    type: 'string',
    example: 'Juan',
  })
  @Column('text', { name: 'firstname' })
  public firstname: string;

  @ApiProperty({
    description: 'The first lastname of the User',
    type: 'string',
    example: 'López',
  })
  @Column('text', { name: 'lastname_1' })
  public lastname_1: string;

  @ApiProperty({
    description: 'The second lastname of the User',
    type: 'string',
    example: 'Pérez',
  })
  @Column('text', { name: 'lastname_2', nullable: true })
  public lastname_2?: string;

  /**
   * Password information.
   */

  @Column('text')
  @Exclude({ toPlainOnly: true })
  public password: string;

  @Exclude({ toPlainOnly: true })
  @Column({ nullable: true, name: 'password_reset_token' })
  public passwordResetToken?: string;

  @Exclude({ toPlainOnly: true })
  @Column({
    nullable: true,
    name: 'password_reset_token_expiration',
    type: 'timestamp with time zone',
  })
  public passwordResetTokenExpiration?: Date;

  /**
   * Role information.
   */

  @ApiProperty({
    description: 'The role of the User',
    type: 'string',
    example: 'admin',
  })
  @Column('text', { name: 'role' })
  public role: 'STUDENT' | 'SELLER' | 'ADMIN';

  /**
   * Timestamp information.
   */

  @ApiProperty({
    description: 'The date of creation of the User',
    type: 'string',
    format: 'date-time',
  })
  @CreateDateColumn({ type: 'timestamptz', name: 'created_at' })
  public created_at: Date;

  @ApiProperty({
    description: 'The date of last update to the User',
    type: 'string',
    format: 'date-time',
  })
  @UpdateDateColumn({ type: 'timestamptz', name: 'updated_at' })
  public updated_at: Date;

  /**
   * ORM Hooks.
   */

  /**
   * Hash the password on insert.
   */
  @BeforeInsert()
  private async hashPasswordOnInsert() {
    this.password = await hash(this.password, 10);
  }

  /**
   * Hash the password on update (if present).
   */
  @BeforeUpdate()
  private async hashPasswordOnUpdate() {
    if (this.password) {
      this.password = await hash(this.password, 10);
    }
  }

  /**
   * Entity methods.
   */

  /**
   * Compare a string with the stored, hashed, password.
   * @param attempt The string to be compared against the hashed password.
   */
  public comparePassword(attempt: string): Promise<boolean> {
    return compare(attempt, this.password);
  }
}
