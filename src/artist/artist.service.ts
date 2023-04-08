import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Artist, ArtistDocument } from './schemas/artist.schema';
import { Song } from 'src/song/schemas/song.schema';
import { DonationsService } from 'src/donations/donations.service';
import { SongService } from 'src/song/song.service';

@Injectable()
export class ArtistService {
  constructor(
    @InjectModel(Artist.name)
    private artistModel: Model<ArtistDocument>,
    private donationService: DonationsService,
    private songService: SongService,
  ) {}
  async allArtist(sortColumn: string, sortType: number, curser: string | number) {
    sortType = Number(sortType);
    let result = null;
    // 첫 요청시
    console.log(curser);
    if (curser === 'first') {
      if (sortType === 1) {
        switch (sortColumn) {
          case 'name':
            result = await this.artistModel.find({}).sort({ artistName: 1 }).limit(10);
            break;
          case 'rank':
            result = await this.artistModel
              .find({})
              .sort({
                duckPoint: 1,
              })
              .limit(10);
            break;
          default:
            throw new Error('으앙');
        }
      } else if (sortType === -1) {
        switch (sortColumn) {
          case 'name':
            result = await this.artistModel.find({}).sort({ artistName: -1 });
            break;
          case 'rank':
            result = await this.artistModel.find({}).sort({
              duckPoint: -1,
            });
            break;
          default:
            throw new Error('으앙');
        }
      } else {
        throw new Error('꺼져');
      }
      return result;
    }

    // 흐하하하
    if (sortType === 1) {
      switch (sortColumn) {
        case 'name':
          result = await this.artistModel
            .find({
              artistName: { $gte: curser },
            })
            .sort({ artistName: 1 })
            .limit(10);
          break;
        case 'rank':
          result = await this.artistModel
            .find({
              duckPoint: { $gte: curser },
            })
            .sort({
              duckPoint: 1,
            })
            .limit(10);
          break;
        default:
          throw new Error('으앙');
      }
      return result;
    } else if (sortType === -1) {
      switch (sortColumn) {
        case 'name':
          result = await this.artistModel
            .find({
              artistName: { $lte: curser },
            })
            .sort({ artistName: -1 });
          break;
        case 'rank':
          result = await this.artistModel
            .find({
              duckPoint: { $lte: curser },
            })
            .sort({
              duckPoint: -1,
            });
          break;
        default:
          throw new Error('으앙');
      }
      return result;
    } else {
      throw new Error('꺼져');
    }
  }

  async artistData(artistId: string) {
    const result = {
      infomations: null,
      donations: [],
    };
    const artistInfo = await this.artistModel.findById(artistId);
    const donations = await this.donationService.getDonations(artistId, 'first');
    result.donations = donations;
    result.infomations = artistInfo;
    /**도네이션 로직 만들고 도네이션 페이지네이션도 구현 */
    return result;
  }
}
