import { Test, TestingModule } from '@nestjs/testing';
import { FinancialTransactionsService } from './financial-transactions.service';

describe('FinancialTransactionsService', () => {
  let service: FinancialTransactionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FinancialTransactionsService],
    }).compile();

    service = module.get<FinancialTransactionsService>(
      FinancialTransactionsService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
