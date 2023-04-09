import { Body, Controller, Get, Param, Query } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger/dist';
import { Song } from '../song/schemas/song.schema';
import { ArtistService } from './artist.service';
import { GetArtistDto } from './dto/get.dto';
import { Artist } from './schemas/artist.schema';

@Controller('artists')
@ApiTags('아티스트 관련 API')
export class ArtistController {
  constructor(private artistService: ArtistService) {}

  @Get('/')
  @ApiOperation({ summary: '아티스트 불러오기', description: 'example 꼭 보셈' })
  @ApiCreatedResponse({ status: 200, description: '배열로 옴', type: [Artist] })
  async getAllArtist(@Query() data: GetArtistDto) {
    const { sortColumn, sortType, curser } = data;
    console.log(data);
    try {
      const artists = await this.artistService.allArtist(sortColumn, sortType, curser);
      return artists;
    } catch (err) {
      console.log(err.message);
      throw new Error('에러');
    }
  }

  @Get('/:artistId')
  @ApiOperation({ summary: '아티스트 페이지 데이터', description: '아티스트 ID로 아티스트 페이지에 필요한 데이터를 받을 수 있음!' })
  @ApiCreatedResponse({ status: 200, description: '아티스트 정보와 응원메시지들이 각각 옴' })
  async getArtistData(@Param('artistId') id: string) {
    try {
      console.log(id);
      const artists = await this.artistService.artistData(id);
      return artists;
    } catch (err) {
      console.log(err.message);
      throw new Error('에러');
    }
  }
}
