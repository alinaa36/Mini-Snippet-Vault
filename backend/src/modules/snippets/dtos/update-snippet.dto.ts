import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { SnippetType } from '../enums/snippet-type.enum';

export class UpdateSnippetDto {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  title: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  content: string;

  @IsArray()
  @IsString({ each: true })
  @IsNotEmpty({ each: true })
  @IsOptional()
  tags?: string[];

  @IsEnum(SnippetType)
  @IsOptional()
  type: SnippetType;
}
