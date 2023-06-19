import { Module } from '@nestjs/common';
import { EquivalenceService } from './equivalence.service';
import { EquivalenceController } from './equivalence.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EquivalenceEntity } from './entities/equivalence.entity';

@Module({
  imports: [TypeOrmModule.forFeature([EquivalenceEntity])],
  controllers: [EquivalenceController],
  providers: [EquivalenceService],
})
export class EquivalenceModule {}
