import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateDonationsDto } from './dto/create.dto';
import { Donations, DonationsDocument } from './schemas/donations.schema';

@Injectable()
export class DonationsService {
  constructor(
    @InjectModel(Donations.name)
    private donationsModel: Model<DonationsDocument>,
  ) {}

  async createDonations(data: CreateDonationsDto) {
    const newData = await this.donationsModel.create(data);
    console.log(newData);

    return newData._id;
  }

  async deleteDonations(id: string, nickname: string) {
    const donations = await this.donationsModel.findById(id);
    if (!donations) throw new HttpException('해당 게임데이터가 존재하지 않습니다.', HttpStatus.NOT_FOUND);
    if (nickname === donations.nickname) throw new HttpException('응원메시지의 작성자만 삭제가 가능합니다.', HttpStatus.FORBIDDEN);
    await this.donationsModel.findByIdAndDelete(id);
    return true;
  }

  /**
   *
   * @param ownerArtistId 아티스트 페이지 조회 및 페이지네이션
   * @param cursor 마지막 데이터의 artistId 값 첫요청시 first
   */
  async getDonations(ownerArtistId: string, cursor: number | string) {
    if (cursor === 'first') {
      const donations = await this.donationsModel
        .find({
          ownerArtistId,
        })
        .sort({ givePoint: 1 })
        .limit(10);
      return donations;
    } else {
      const donations = await this.donationsModel
        .find({ ownerArtistId, givePoint: { $gt: cursor } })
        .sort({ givePoint: 1 })
        .limit(10);
      return donations;
    }
  }
}
