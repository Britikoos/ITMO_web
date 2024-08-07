import { Module } from '@nestjs/common';
import { TableService } from './table.service';
import { TableController } from './table.controller';
import { PrismaService } from '../prisma.service';

@Module({
  controllers: [TableController],
  providers: [TableService, PrismaService],
  exports: [TableService],
})
export class TableModule {}
