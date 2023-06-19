import { Test, TestingModule } from '@nestjs/testing';
import { EquivalenceController } from './equivalence.controller';
import { EquivalenceService } from './equivalence.service';

describe('EquivalenceController', () => {
  let controller: EquivalenceController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EquivalenceController],
      providers: [EquivalenceService],
    }).compile();

    controller = module.get<EquivalenceController>(EquivalenceController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
