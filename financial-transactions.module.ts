import { Module } from '@nestjs/common';
import { FinancialTransactionsController } from './financial-transactions.controller';
import { FinancialTransactionsService } from './financial-transactions.service';
import { PrismaService } from '../prisma.service';
import { UsersService } from '../users/users.service';

@Module({
  controllers: [FinancialTransactionsController],
  providers: [FinancialTransactionsService, PrismaService, UsersService],
})
export class FinancialTransactionsModule {}
