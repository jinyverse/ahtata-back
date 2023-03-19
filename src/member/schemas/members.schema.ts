import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger/dist/decorators';
import { Types } from 'mongoose';

export type MemberDocument = Member & Document;
@ObjectType()
@Schema()
export class Member {
  @Field(() => Int)
  @Prop({ default: 0 })
  @ApiProperty({ description: '보유 덕집력' })
  point: number;

  @Field()
  @Prop({ required: true, unique: true })
  @ApiProperty({ description: '닉넴' })
  nickname: string; //(응원기록한 유저의 닉넴 / 게임데이터 닉넴)

  @Field()
  @Prop()
  @ApiProperty({ description: '비번' })
  password: string; //(암호화)

  @Field()
  @Prop({ default: false })
  @ApiProperty({ description: '로그인여부' })
  isLoggedIn: boolean;

  @Field()
  @Prop({ default: '' })
  @ApiProperty({ description: '마지막 플레이 리워드' })
  lastGameDataId: string; //(GameDatas의 uuid)

  @Field()
  @Prop({ default: '' })
  @ApiProperty({ description: '선호하는 아티스트' })
  favoritArtist: string;

  @Field()
  @Prop({ default: Date.now })
  @ApiProperty({ description: '생성일' })
  createdAt: Date;
}
export const MemberSchema = SchemaFactory.createForClass(Member);
