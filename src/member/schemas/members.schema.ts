import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

export type MemberDocument = Member & Document;
@ObjectType()
@Schema()
export class Member {
  @Field(() => Int)
  @Prop({ default: 0 })
  point: number;

  @Field()
  @Prop({ required: true, unique: true })
  nickname: string; //(응원기록한 유저의 닉넴 / 게임데이터 닉넴)

  @Field()
  @Prop()
  password: string; //(암호화)

  @Field()
  @Prop({ default: false })
  isLoggedIn: boolean;

  @Field()
  @Prop({ default: '' })
  lastGameDataId: string; //(GameDatas의 uuid)

  @Field()
  @Prop({ default: '' })
  favoritArtist: string;

  @Field()
  @Prop({ default: Date.now })
  createdAt: Date;
}
export const MemberSchema = SchemaFactory.createForClass(Member);
