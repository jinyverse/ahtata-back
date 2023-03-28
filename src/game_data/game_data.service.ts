import { Injectable } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common/enums';
import { HttpException } from '@nestjs/common/exceptions';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateGameDataDto } from './dto/create.dto';
import { GameData, GameDataDocument } from './schemas/gameData.schema';

@Injectable()
export class GameDataService {
  constructor(
    @InjectModel(GameData.name)
    private gamaDataModel: Model<GameDataDocument>,
  ) {}

  async createGameData(data: CreateGameDataDto) {
    const newData = await this.gamaDataModel.create(data);
    console.log(newData);

    return newData._id;
  }

  async getGameData(_id: string) {
    const gameData = await this.gamaDataModel.findById(_id);
    if (!gameData) throw new HttpException('해당 게임데이터가 존재하지 않습니다.', HttpStatus.NOT_FOUND);
    return gameData;
  }
}
