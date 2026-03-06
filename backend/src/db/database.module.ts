import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MongooseModule, MongooseModuleOptions } from '@nestjs/mongoose';
import { EnvironmentVars } from 'src/environment-vars';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: (
        appConfig: ConfigService<EnvironmentVars>,
      ): MongooseModuleOptions => ({
        uri: appConfig.get('MONGO_URI'),
      }),
      inject: [ConfigService],
    }),
  ],
  exports: [MongooseModule],
})
export class DatabaseModule {}
