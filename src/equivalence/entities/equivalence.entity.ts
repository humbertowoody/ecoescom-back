import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { CreditEntity } from 'src/credit/entities/credit.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('equivalence')
export class EquivalenceEntity {
  @ApiProperty({
    description: 'The ID of the Equivalence',
    type: 'string',
    format: 'uuid',
  })
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  /**
   * Relationships.
   */

  @ApiPropertyOptional({
    description: 'The credits of the Equivalence',
    type: () => CreditEntity,
    isArray: true,
  })
  @OneToMany(
    (type) => CreditEntity,
    (credit: CreditEntity) => credit.equivalence,
  )
  credits?: CreditEntity[];

  /**
   * Equivalence attributes.
   */

  @ApiProperty({
    description: 'The name of the Equivalence',
    type: 'string',
    example: 'Botellas de PET',
  })
  @Column('text', { nullable: false })
  public name: string;

  @ApiProperty({
    description: 'The description of the Equivalence',
    type: 'string',
    example: 'Botellas de PET de 600 ml',
  })
  @Column('text', { nullable: false })
  public description: string;

  @ApiProperty({
    description: 'The unit of the Equivalence',
    type: 'string',
    example: 'Botellas',
  })
  @Column('text', { nullable: false })
  public unit: string;

  @ApiProperty({
    description: 'The value for multiplication of the Equivalence',
    type: 'number',
    example: 1,
  })
  @Column('int', { nullable: false })
  public value: number;

  @ApiProperty({
    description: 'The minimum value of the Equivalence',
    type: 'number',
    example: 1,
  })
  @Column('int', { nullable: false })
  public min: number;

  @ApiProperty({
    description: 'The maximum value of the Equivalence',
    type: 'number',
    example: 1,
  })
  @Column('int', { nullable: false })
  public max: number;

  /**
   * Operational information.
   */

  @ApiProperty({
    description: 'A flag indicating if the Equivalence is enabled',
    type: 'boolean',
    example: true,
  })
  @Column('boolean', { name: 'enabled', default: true })
  public enabled: boolean;

  /**
   * Timestamp information.
   */

  @ApiProperty({
    description: 'The date of creation of the Equivalence',
    type: 'string',
    format: 'date-time',
  })
  @Column('timestamptz', { name: 'created_at', nullable: false })
  @CreateDateColumn({
    type: 'timestamptz',
    name: 'created_at',
    nullable: false,
  })
  public created_at: string;

  @ApiProperty({
    description: 'The date of update of the Equivalence',
    type: 'string',
    format: 'date-time',
  })
  @UpdateDateColumn({
    type: 'timestamptz',
    name: 'updated_at',
    nullable: false,
  })
  public updated_at: string;
}
