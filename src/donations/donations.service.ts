import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateDonationsDto } from './dto/create.dto';
import { Donations, DonationsDocument } from './schemas/donations.schema';
import { Member, MemberDocument } from '../member/schemas/members.schema';

@Injectable()
export class DonationsService {
  constructor(
    @InjectModel(Donations.name) private donationsModel: Model<DonationsDocument>,
    @InjectModel(Member.name) private memberModel: Model<MemberDocument>,
  ) {}

  async createDonation(createDonationDto: CreateDonationsDto){
    const { givePoint, nickname, text } = createDonationDto;
    const member = await this.memberModel.findOne({ nickname }).exec();

    if (!member) throw new HttpException('회원 정보를 찾을 수 없습니다.', HttpStatus.BAD_REQUEST);
    if (member.point < givePoint) throw new HttpException('덕집력이 부족합니다', HttpStatus.BAD_REQUEST);

    member.point -= givePoint;
    await member.save();

    const createdDonation = new this.donationsModel({ givePoint, text, member: member._id });
    return createdDonation.save();
  }

  async deleteDonation(id: string, nickname: string) {
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
