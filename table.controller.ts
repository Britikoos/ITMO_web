import {
  Controller,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Get,
  UseGuards,
} from '@nestjs/common';
import { TableService } from './table.service';
import { CreateTableDto } from './dto/create-table.dto';
import { UpdateTableDto } from './dto/update-table.dto';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { TableEntity } from './entities/table.entity';
import { JwtAuthGuard } from '../auth/auth.guard';

@ApiTags('table')
@Controller('table')
export class TableController {
  constructor(private readonly tableService: TableService) {}

  @ApiOperation({ summary: 'Create new Table' })
  @ApiOkResponse({ status: 201, description: 'Successfully сreated' })
  @ApiBadRequestResponse({ status: 400, description: 'Bad Request' })
  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createTableDto: CreateTableDto) {
    return this.tableService.create(createTableDto);
  }

  @ApiOperation({ summary: 'Update Table by table_id' })
  @ApiOkResponse({
    status: 201,
    description: 'Successfully delete',
    type: [TableEntity],
  })
  @ApiBadRequestResponse({ status: 400, description: 'Bad Request' })
  @ApiNotFoundResponse({ description: 'Nonexistent Table' })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTableDto: UpdateTableDto) {
    return this.tableService.update(+id, updateTableDto);
  }

  @ApiOkResponse({
    description: 'All Tables have been found',
    type: [TableEntity],
  })
  @ApiNotFoundResponse({
    description: 'No Tables in the system',
  })
  @Get()
  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard)
  findAll() {
    return this.tableService.findAll();
  }

  @ApiOperation({ summary: 'Update Table by table_id' })
  @ApiOkResponse({
    status: 201,
    description: 'Successfully delete',
    type: [TableEntity],
  })
  @ApiBadRequestResponse({ status: 400, description: 'Bad Request' })
  @ApiNotFoundResponse({ description: 'Nonexistent Table' })
  @Get(':id')
  get(@Param('id') id: string) {
    return this.tableService.getTable(parseInt(id, 10));
  }
  @ApiOperation({ summary: 'Delete Table by table_id' })
  @ApiOkResponse({ status: 201, description: 'Successfully delete' })
  @ApiBadRequestResponse({ status: 400, description: 'Bad Request' })
  @Delete(':id')
  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: string) {
    return this.tableService.remove(+id);
  }
}
