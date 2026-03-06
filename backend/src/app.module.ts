import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './db/database.module';
import { validateEnvVars } from './environment-vars';

@Module({
  imports: [
    DatabaseModule,
    ConfigModule.forRoot({
      envFilePath: process.env.NODE_ENV === 'production' ? '.env.prod' : '.env',
      isGlobal: true,
      validate: validateEnvVars,
    }),
  ],
})
export class AppModule {}
