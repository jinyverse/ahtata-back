import { Controller, Get, Patch, Post } from '@nestjs/common';
import { Body, Delete } from '@nestjs/common/decorators';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger/dist';
import { CreateRankingDto } from './dto/create.dto';
import { RankingsService } from './rankings.service';
import { Ranking } from './schemas/ranging.schema';

@Controller('rankings')
@ApiTags('rank 관련 API')
export class RankingsController {
  constructor(private rankingService: RankingsService) {}

  @ApiOperation({ summary: '개인랭킹등재', description: '꼭 이거 먼저 요청후 게임데이터 요청할것' })
  @ApiCreatedResponse({ status: 201, description: '리스폰되는 rank 확인 ', type: Ranking })
  @Patch()
  async listingRanking(@Body() rankingData: CreateRankingDto) {
    try {
      const result = await this.rankingService.listingRank(rankingData);
      return result;
    } catch (err) {
      console.log(err);
    }
  }

  // @Get('/artists')
  // async getArtistRanking() {
  //   // 아티스트 랭킹 조회 redis 로 처리 할 수 있다면 하기
  // }
  @ApiOperation({ summary: '개인랭킹목록' })
  @ApiCreatedResponse({ status: 200, description: '배열로 옴', type: Ranking })
  @Get('/gamers')
  async getGamerRanking() {
    // 게이머들의 랭킹 조회
    const list = await this.rankingService.getGamerRank();
    return list;
  }

  @ApiOperation({ summary: '랭킹 전체지우는것!!! 실행시 랭킹데이터 다 날아가니 주의  %꼭필요할때만 사용할것%' })
  @Delete()
  async test() {
    await this.rankingService.remove();
    return;
  }
}
