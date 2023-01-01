import { Module } from '@nestjs/common';
import { JourneysService } from './journeys.service';
import { JourneysController } from './journeys.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Journey } from './entities/journey.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Journey])],
  controllers: [JourneysController],
  providers: [JourneysService],
  exports: [JourneysService],
})
export class JourneysModule {}
