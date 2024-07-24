import { Injectable, NotFoundException } from '@nestjs/common';
import { FinancialTransaction } from '@prisma/client';
import { PrismaService } from '../prisma.service';
import { FinancialTransactionDto } from './dto/create-transaction.dto';

@Injectable()
export class FinancialTransactionsService {
  constructor(private prisma: PrismaService) {}

  async createTransaction(
    financialTransactionDto: FinancialTransactionDto,
  ): Promise<FinancialTransaction> {
    return this.prisma.financialTransaction.create({
      data: {
        from_user_id: financialTransactionDto.from_user_id,
        to_user_id: financialTransactionDto.to_user_id,
        type: financialTransactionDto.type,
        amount: financialTransactionDto.amount,
        timestamp: financialTransactionDto.timestamp,
        status: financialTransactionDto.status,
      },
    });
  }

  async updateTransaction(
    financialTransactionDto: FinancialTransactionDto,
  ): Promise<FinancialTransaction> {
    return this.prisma.financialTransaction.create({
      data: {
        from_user_id: financialTransactionDto.from_user_id,
        to_user_id: financialTransactionDto.to_user_id,
        type: financialTransactionDto.type,
        amount: financialTransactionDto.amount,
        timestamp: financialTransactionDto.timestamp,
        status: financialTransactionDto.status,
      },
    });
  }

  async getFinancialTransactionById(
    transId: number,
  ): Promise<FinancialTransaction | null> {
    const transaction: FinancialTransaction =
      await this.prisma.financialTransaction.findUnique({
        where: { transaction_id: transId },
      });

    if (transaction == null) {
      throw new NotFoundException('Nonexistent transaction');
    }

    return {
      transaction_id: transaction.transaction_id,
      from_user_id: transaction.from_user_id,
      to_user_id: transaction.to_user_id,
      type: transaction.type,
      amount: transaction.amount,
      timestamp: transaction.timestamp,
      status: transaction.status,
    };
  }

  async findAll() {
    return await this.prisma.financialTransaction.findMany();
  }

  async deleteFinancialTransaction(transId: number): Promise<void> {
    await this.prisma.financialTransaction.delete({
      where: { transaction_id: transId },
    });
  }

  /*async transferFinancialTransaction(from_user_id: number, to_user_id: number, amount: number): Promise<void> {
    const user_from = await this.prisma.UserService.getUserById(from_user_id);
    const user_to  = await this.prisma.UserService.getUserById(to_user_id);



  }*/
}
