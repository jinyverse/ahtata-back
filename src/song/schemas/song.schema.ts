import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { ObjectId, Types } from 'mongoose';
import { Artist } from '../../artist/schemas/artist.schema';

export type SongDocument = Song & Document;
@ObjectType()
@Schema()
export class Song {
  @Prop({ type: mongoose.Types.ObjectId })
  owner: Artist;

  @Prop()
  songList: [
    {
      index: number;
      title: string;
      albumName: string;
      albumImgUrl: string;
      since: {
        year: number;
        month: number;
        date: number;
      };
    },
  ];

  @Prop({ type: Date, default: Date.now() })
  createdAt: Date;

  @Prop({ type: Date, default: Date.now() })
  updatedAt: Date;
}
export const SongSchema = SchemaFactory.createForClass(Song);
