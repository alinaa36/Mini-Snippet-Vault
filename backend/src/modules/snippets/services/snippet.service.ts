import {
  Snippet,
  SnippetDocument,
} from 'src/modules/snippets/schema/snippet.schema';
import { CreateSnippetDto } from '../dtos/create-snippet.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UpdateSnippetDto } from '../dtos/update-snippet.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { GetSnippetDto } from '../dtos/get-snippet.dto';
import { QueryFilter } from '../interfaces/query-filter.interface';

@Injectable()
export class SnippetService {
  constructor(
    @InjectModel(Snippet.name) private snippetModel: Model<SnippetDocument>,
  ) {}
  async create(snippet: CreateSnippetDto): Promise<Snippet> {
    const createdSnippet = new this.snippetModel(snippet);
    return createdSnippet.save();
  }

  async findAll(
    query: GetSnippetDto,
  ): Promise<{ data: Snippet[]; total: number; pages: number }> {
    const { page = 1, limit = 9, q, tag } = query; // limit = 9 як у тебе на фронті
    const skip = (page - 1) * limit;

    const filters = this.prepareFilters(q, tag);

    const [data, total] = await Promise.all([
      this.snippetModel
        .find(filters)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean()
        .exec(),
      this.snippetModel.countDocuments(filters).exec(),
    ]);

    return {
      data: data as Snippet[],
      total,
      pages: Math.ceil(total / limit),
    };
  }

  private prepareFilters(search?: string, tag?: string) {
    const filters: QueryFilter = {};

    if (search) {
      filters.$or = [
        { title: { $regex: search, $options: 'i' } },
        { content: { $regex: search, $options: 'i' } },
      ];
    }

    if (tag) {
      filters.tags = tag;
    }

    return filters;
  }

  async findOne(id: string): Promise<Snippet> {
    const snippet = await this.snippetModel.findById(id).exec();

    if (!snippet) {
      throw new NotFoundException('Snippet not found');
    }
    return snippet;
  }

  async update(id: string, updateData: UpdateSnippetDto): Promise<Snippet> {
    const updatedSnippet = await this.snippetModel
      .findByIdAndUpdate(id, updateData, { new: true })
      .exec();

    if (!updatedSnippet) {
      throw new NotFoundException('Snippet not found');
    }

    return updatedSnippet;
  }

  async delete(id: string): Promise<void> {
    const result = await this.snippetModel.findByIdAndDelete(id).exec();

    if (!result) {
      throw new NotFoundException('Snippet not found');
    }

    return;
  }

  async findUniqueTags(): Promise<string[]> {
    const tags = await this.snippetModel.distinct('tags').exec();
    return tags;
  }
}
