import { Controller, Get, Query } from '@nestjs/common';
import { ApiOperation, ApiTags, ApiCreatedResponse } from '@nestjs/swagger/dist';
import { Song } from './schemas/song.schema';
import { SongService } from './song.service';

@Controller('songs')
@ApiTags('노래 관련 API')
export class SongController {
  constructor(private songService: SongService) {}

  @Get()
  @ApiOperation({ summary: '아티스트ID로 무작위 10곡 받기', description: '아티스트 ID를 Query로 보내세요.' })
  @ApiCreatedResponse({ status: 200, description: '무작위 10곡! ', type: [Song] })
  async getSongs(@Query('artistId') artistId: string) {
    const songs = await this.songService.getRandomSongs(artistId);
    return songs;
  }
}
