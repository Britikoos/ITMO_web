import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTableDto } from './dto/create-table.dto';
import { UpdateTableDto } from './dto/update-table.dto';
import { PrismaService } from '../prisma.service';

@Injectable()
export class TableService {
  constructor(private prisma: PrismaService) {}
  create(createTableDto: CreateTableDto) {
    return this.prisma.table.create({
      data: {
        score_id: createTableDto.score_id,
        user_id: createTableDto.user_id,
        main_user_id: createTableDto.main_user_id,
      },
    });
  }

  async getTable(id: number) {
    const table = await this.prisma.table.findUnique({
      where: { table_id: id },
    });

    if (table == null) {
      throw new NotFoundException('Nonexistent Table');
    }

    return table;
  }
  async findAll() {
    return await this.prisma.table.findMany();
  }

  update(id: number, updateTableDto: UpdateTableDto) {
    return this.prisma.table.update({
      where: {
        table_id: id,
      },
      data: {
        score_id: updateTableDto.score_id,
        user_id: updateTableDto.user_id,
        main_user_id: updateTableDto.main_user_id,
      },
    });
  }

  async remove(id: number): Promise<void> {
    await this.prisma.table.delete({
      where: {
        table_id: id,
      },
    });
  }
}
