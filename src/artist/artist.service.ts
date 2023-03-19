import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Artist, ArtistDocument } from './schemas/artist.schema';

@Injectable()
export class ArtistService {
  constructor(
    @InjectModel(Artist.name)
    private artistModel: Model<ArtistDocument>,
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
}
