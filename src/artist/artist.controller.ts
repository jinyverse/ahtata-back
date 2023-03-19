import { Body, Controller, Get, Query } from '@nestjs/common';
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
}
