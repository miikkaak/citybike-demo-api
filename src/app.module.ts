import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { dataSourceOptions } from './db/data-source';
import { JourneysModule } from './journeys/journeys.module';
import { JourneysService } from './journeys/journeys.service';
import { StationsModule } from './stations/stations.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    JourneysModule,
    TypeOrmModule.forRoot(dataSourceOptions),
    StationsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
