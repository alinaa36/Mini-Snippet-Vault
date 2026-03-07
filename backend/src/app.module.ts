import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './db/database.module';
import { validateEnvVars } from './environment-vars';
import { SnippetModule } from './modules/snippets/snippet.module';
import { AppEnvironment } from './modules/common/constants/env.constants';

@Module({
  imports: [
    DatabaseModule,
    ConfigModule.forRoot({
      envFilePath:
        process.env.NODE_ENV === AppEnvironment.PRODUCTION
          ? '.env.prod'
          : '.env',
      isGlobal: true,
      validate: validateEnvVars,
    }),
    SnippetModule,
  ],
})
export class AppModule {}
