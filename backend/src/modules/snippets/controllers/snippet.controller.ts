import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { SnippetService } from '../services/snippet.service';
import { CreateSnippetDto } from '../dtos/create-snippet.dto';
import { UpdateSnippetDto } from '../dtos/update-snippet.dto';
import { ParseObjectIdPipe } from 'src/modules/common/pipes/parse-id.pipe';
import { GetSnippetDto } from '../dtos/get-snippet.dto';

@Controller('snippets')
export class SnippetController {
  constructor(private readonly snippetService: SnippetService) {}

  @Post()
  async create(@Body() data: CreateSnippetDto) {
    return this.snippetService.create(data);
  }

  @Get()
  async findAll(@Query() query: GetSnippetDto) {
    return this.snippetService.findAll(query);
  }

  @Get('tags')
  async getTags() {
    return await this.snippetService.findUniqueTags();
  }

  @Get(':id')
  async findOne(@Param('id', ParseObjectIdPipe) id: string) {
    return this.snippetService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id', ParseObjectIdPipe) id: string,
    @Body() data: UpdateSnippetDto,
  ) {
    return this.snippetService.update(id, data);
  }

  @Delete(':id')
  async delete(@Param('id', ParseObjectIdPipe) id: string) {
    return this.snippetService.delete(id);
  }
}
