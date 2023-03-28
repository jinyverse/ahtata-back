import { Module } from '@nestjs/common';
import { GameDataService } from './game_data.service';
import { GameDataController } from './game_data.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { GameData, GameDataSchema } from './schemas/gameData.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: GameData.name, schema: GameDataSchema }])],
  providers: [GameDataService],
  controllers: [GameDataController],
})
export class GameDataModule {}
