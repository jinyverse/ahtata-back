import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ArtistController } from './artist.controller';
import { ArtistService } from './artist.service';
import { Artist, ArtistSchema } from './schemas/artist.schema';
import { DonationsModule } from 'src/donations/donations.module';
import { SongModule } from 'src/song/song.module';

@Module({
  imports: [SongModule, DonationsModule, MongooseModule.forFeature([{ name: Artist.name, schema: ArtistSchema }])],
  controllers: [ArtistController],
  providers: [ArtistService],
})
export class ArtistModule {}
