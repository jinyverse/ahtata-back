import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Artist } from 'src/artist/schemas/artist.schema';

export type DonationsDocument = Donations & Document;
@ObjectType()
@Schema()
export class Donations {
  @Prop()
  ownerArtistId: Artist;

  @Prop()
  text: string;

  @Prop()
  givePoint: number;

  @Prop()
  nickname: string;

  @Prop({ type: Date, default: Date.now() })
  createdAt: Date;

  @Prop({ type: Date, default: Date.now() })
  updatedAt: Date;
}
export const DonationsSchema = SchemaFactory.createForClass(Donations);
