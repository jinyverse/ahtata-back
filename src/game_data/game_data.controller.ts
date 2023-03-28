import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateGameDataDto } from './dto/create.dto';
import { GameDataService } from './game_data.service';
import { GameData } from './schemas/gameData.schema';

@Controller('game-datas')
@ApiTags('게임데이타타 관련 API')
export class GameDataController {
  constructor(private gameDataService: GameDataService) {}

  @Post()
  @ApiOperation({ summary: '게임데이터 저장', description: '바디값 채워서 보내기' })
  @ApiCreatedResponse({ status: 201, description: '저장된 gameDataId 반환', type: String })
  async createData(@Body() gameData: CreateGameDataDto) {
    try {
      const result = await this.gameDataService.createGameData(gameData);
      return result;
    } catch (err) {
      console.log(err);
    }
  }

  @Get()
  @ApiOperation({ summary: '게임데이터 찾기', description: '게임데이터 ID로 데이터찾기' })
  @ApiCreatedResponse({ status: 201, description: '완료시 게임데이터 반환', type: GameData })
  async getData(@Query('gameDataId') _id: string) {
    try {
      const result = await this.gameDataService.getGameData(_id);
      return result;
    } catch (err) {
      console.log(err);
    }
  }
}
