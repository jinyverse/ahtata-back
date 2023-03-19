import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { Song, SongDocument } from './schemas/song.schema';
import { ObjectId } from 'mongoose';

@Injectable()
export class SongService {
  constructor(
    @InjectModel(Song.name)
    private songModel: Model<SongDocument>,
  ) {}

  async getRandomSongs(artistId: string) {
    const a = new mongoose.Types.ObjectId(artistId);
    const songs = (await this.songModel.findOne({ owner: a })).songList;
    const result = [];
    for (let i = 0; i < 10; i++) {
      const random = Math.round(Math.random() * (songs.length - 1));
      result.push(songs[random]);
    }
    return result;
  }
}
