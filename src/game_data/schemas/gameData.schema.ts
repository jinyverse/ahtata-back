import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Types } from 'mongoose';

export type GameDataDocument = GameData & Document;
@ObjectType()
@Schema()
export class GameData {
  @Prop({ type: String })
  nickname: string;

  @Prop()
  score: number;

  @Prop({ type: Number, default: 0 })
  clearTime: string;

  @Prop({ type: Number, default: 0 })
  answerCount: number;

  @Prop()
  playArtist: string;

  @Prop()
  playCardList: [
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
export const GameDataSchema = SchemaFactory.createForClass(GameData);
