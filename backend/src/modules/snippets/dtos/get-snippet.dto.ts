import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsString, Min } from 'class-validator';

export class GetSnippetDto {
  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  @Min(1)
  page: number;

  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  @Min(1)
  limit: number;

  @IsString()
  @IsOptional()
  q?: string;

  @IsString()
  @IsOptional()
  tag?: string;
}
