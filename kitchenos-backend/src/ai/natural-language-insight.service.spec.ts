import { Test, TestingModule } from '@nestjs/testing';
import { NaturalLanguageInsightService } from './natural-language-insight.service';

describe('NaturalLanguageInsightService', () => {
  let service: NaturalLanguageInsightService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NaturalLanguageInsightService],
    }).compile();

    service = module.get<NaturalLanguageInsightService>(NaturalLanguageInsightService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
