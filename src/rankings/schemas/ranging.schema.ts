import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Types } from 'mongoose';

export type RankingDocument = Ranking & Document;
@ObjectType()
@Schema()
export class Ranking {
  @Prop()
  rank: number;

  @Prop()
  nickname: string;

  @Prop()
  score: number;

  @Prop({ type: Date, default: Date.now() })
  createdAt: Date;

  @Prop({ type: Date, default: Date.now() })
  updatedAt: Date;
}
export const RankingSchema = SchemaFactory.createForClass(Ranking);
