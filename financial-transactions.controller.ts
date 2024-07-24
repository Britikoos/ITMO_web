import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { FinancialTransactionsService } from './financial-transactions.service';
import { FinancialTransaction } from '@prisma/client';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { FinancialTransactionDto } from './dto/create-transaction.dto';
import { TransactionEntity } from './entity/transaction.entity';
import { JwtAuthGuard } from '../auth/auth.guard';

@ApiTags('financial-transactions')
@Controller('financial-transactions')
export class FinancialTransactionsController {
  constructor(
    private readonly financialTransactionsService: FinancialTransactionsService,
  ) {}

  @ApiOperation({ summary: 'Get Financial Transaction' })
  @ApiOkResponse({
    status: 201,
    description: 'Successfully got',
    type: [TransactionEntity],
  })
  @ApiBadRequestResponse({ status: 400, description: 'Bad Request' })
  @ApiNotFoundResponse({ description: 'Nonexistent Transaction' })
  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getFinancialTransactionById(
    @Param('id') transactionId: string,
  ): Promise<FinancialTransaction> {
    return await this.financialTransactionsService.getFinancialTransactionById(
      parseInt(transactionId, 10),
    );
  }

  @ApiOperation({ summary: 'Create new Financial Transaction' })
  @ApiOkResponse({ status: 201, description: 'Successfully сreated' })
  @ApiBadRequestResponse({ status: 400, description: 'Bad Request' })
  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard)
  @Post()
  async createTransaction(
    @Body() financialTransactionDto: FinancialTransactionDto,
  ) {
    return await this.financialTransactionsService.createTransaction(
      financialTransactionDto,
    );
  }

  @ApiOkResponse({
    description: 'All Transactions have been found',
    type: [TransactionEntity],
  })
  @ApiNotFoundResponse({
    description: 'No Transactions in the system',
  })
  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.financialTransactionsService.findAll();
  }

  @ApiOperation({ summary: 'Create new Financial Transaction' })
  @ApiOkResponse({ status: 201, description: 'Successfully сreated' })
  @ApiBadRequestResponse({ status: 400, description: 'Bad Request' })
  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async updateTransaction(
    @Body() financialTransactionDto: FinancialTransactionDto,
  ) {
    return await this.financialTransactionsService.createTransaction(
      financialTransactionDto,
    );
  }

  @ApiOperation({ summary: 'Delete new Financial Transaction' })
  @ApiOkResponse({ status: 201, description: 'Successfully deleted' })
  @ApiBadRequestResponse({ status: 400, description: 'Bad Request' })
  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deleteFinancialTransaction(
    @Param('id') transactionId: string,
  ): Promise<void> {
    await this.financialTransactionsService.deleteFinancialTransaction(
      parseInt(transactionId, 10),
    );
  }
}
