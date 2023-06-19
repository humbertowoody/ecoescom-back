import { Test, TestingModule } from '@nestjs/testing';
import { EquivalenceService } from './equivalence.service';

describe('EquivalenceService', () => {
  let service: EquivalenceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EquivalenceService],
    }).compile();

    service = module.get<EquivalenceService>(EquivalenceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
