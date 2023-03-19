import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Types } from 'mongoose';

export type ArtistDocument = Artist & Document;
@ObjectType()
@Schema()
export class Artist {
  @Prop({ type: String, unique: true })
  artistName: string;

  @Prop()
  artistImgUrl: string;

  @Prop({ type: Number, default: 0 })
  duckPoint: number;

  @Prop({ type: Number, default: 0 })
  usedCount: number;

  @Prop([{ type: mongoose.Types.ObjectId, ref: 'donations' }])
  donationMsg: [];

  @Prop([{ type: mongoose.Types.ObjectId, ref: 'Song' }])
  albumList: [];

  @Prop({ type: Date, default: Date.now() })
  createdAt: Date;

  @Prop({ type: Date, default: Date.now() })
  updatedAt: Date;
}
export const ArtistSchema = SchemaFactory.createForClass(Artist);
