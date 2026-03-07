import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose/dist/mongoose.module';
import { DatabaseModule } from 'src/db/database.module';
import { SnippetService } from './services/snippet.service';
import { SnippetController } from './controllers/snippet.controller';
import {
  Snippet,
  SnippetSchema,
} from 'src/modules/snippets/schema/snippet.schema';

@Module({
  imports: [
    DatabaseModule,
    MongooseModule.forFeature([{ name: Snippet.name, schema: SnippetSchema }]),
  ],
  providers: [SnippetService],
  controllers: [SnippetController],
})
export class SnippetModule {}
