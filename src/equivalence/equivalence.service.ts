import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EquivalenceEntity } from './entities/equivalence.entity';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class EquivalenceService extends TypeOrmCrudService<EquivalenceEntity> {
  constructor(
    @InjectRepository(EquivalenceEntity)
    private readonly equivalenceRepository: Repository<EquivalenceEntity>,
  ) {
    super(equivalenceRepository);
  }
}
