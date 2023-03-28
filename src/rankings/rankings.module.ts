import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RankingsController } from './rankings.controller';
import { RankingsService } from './rankings.service';
import { Ranking, RankingSchema } from './schemas/ranging.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Ranking.name, schema: RankingSchema }])],
  controllers: [RankingsController],
  providers: [RankingsService],
})
export class RankingsModule {}
