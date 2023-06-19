import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { EquivalenceEntity } from 'src/equivalence/entities/equivalence.entity';
import { UserEntity } from 'src/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('credit')
export class CreditEntity {
  @ApiProperty({
    description: 'The ID of the Credit',
    type: 'string',
    format: 'uuid',
  })
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  /**
   * Relationships.
   */

  @ApiPropertyOptional({
    description: 'The user that owns the Credit',
    type: () => UserEntity,
  })
  @ManyToOne((type) => UserEntity, (user) => user.credits)
  public user?: UserEntity;

  @ApiPropertyOptional({
    description: 'The equivalence used in the Credit',
    type: () => EquivalenceEntity,
  })
  @ManyToOne(
    (type) => EquivalenceEntity,
    (equivalence: EquivalenceEntity) => equivalence.credits,
  )
  public equivalence?: EquivalenceEntity;

  /**
   * Credit information.
   */

  @ApiProperty({
    description: 'The amount of credits given to the user',
    type: 'number',
    example: 100,
  })
  @Column('int', { nullable: false })
  quantity: number;

  @ApiProperty({
    description: 'The URL for the image of the credit',
    type: 'string',
    example:
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAIAQMAAAD+wSzIAAAABlBMVEX///+/v7+jQ3Y5AAAADklEQVQI12P4AIX8EAgALgAD/aNpbtEAAAAASUVORK5CYII',
  })
  @Column('text', { name: 'photo_url', nullable: false })
  photo_url: string;

  @ApiProperty({
    description: 'A flag indicating if the credit has been reported',
    type: 'boolean',
    example: false,
  })
  @Column('boolean', { name: 'reported', default: false })
  reported: boolean;

  @ApiProperty({
    description: 'The date of the report of the credit',
    type: 'string',
    format: 'date-time',
  })
  @Column('timestamptz', { name: 'reported_at', nullable: true })
  reported_at?: Date;

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
}
