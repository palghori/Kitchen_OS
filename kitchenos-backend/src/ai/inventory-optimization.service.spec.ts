import { Test, TestingModule } from '@nestjs/testing';
import { InventoryOptimizationService } from './inventory-optimization.service';

describe('InventoryOptimizationService', () => {
  let service: InventoryOptimizationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InventoryOptimizationService],
    }).compile();

    service = module.get<InventoryOptimizationService>(InventoryOptimizationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
