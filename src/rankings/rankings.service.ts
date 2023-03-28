import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ArtistService } from 'src/artist/artist.service';
import { CreateRankingDto } from './dto/create.dto';
import { Ranking, RankingDocument } from './schemas/ranging.schema';

@Injectable()
export class RankingsService {
  constructor(
    @InjectModel(Ranking.name)
    private rankingModel: Model<RankingDocument>,
  ) {}

  // 랭킹부분을 하루 랭킹 단위로 끊어서 업데이트하면 어떨까?
  // 랭킹을 처리할 수 있는 방법 2 가지
  /**
   * 1. Redis나 node Ram을 이용하여 1시간, 6시간, 24시간 주기로 한번씩 DB에 업데이트
   * => 이것의 장점은 DB에 부하를 줄여줄 수 있다는 것! 여러 클러스터 환경에서도
   * redis 를 이용하여
   * 2. 게임을 플레이 할때마다 이진탐색+update 를 하는 방식
   * 3. 게임을 플레이 할때마다 1000개의 리스트 가져와서 node내부에서 처리후, DB에 저장하는 방식
   */
  async listingRank(rankingData: CreateRankingDto) {
    // 3번방법
    const nowRanking = await this.rankingModel
      .find({ $lte: { rank: 100 } })
      .sort({ rank: 1 })
      .limit(100);
    // 현재 랭킹등재가 1000개 미만이고, 마지막랭킹보다 낮다면 그냥 만들기
    if (nowRanking.length === 0) {
      const listingRank = await this.rankingModel.create({ ...rankingData, rank: nowRanking.length + 1 });
      console.log('첫번째임');
      return listingRank;
    }
    if (nowRanking.length < 100 && nowRanking[nowRanking.length - 1].score >= rankingData.score) {
      const listingRank = await this.rankingModel.create({ ...rankingData, rank: nowRanking.length + 1 });
      console.log('100등이하이고 ', nowRanking[nowRanking.length - 1].score, '보다 작거나 같음');
      return listingRank;
    }
    if (nowRanking.length < 100 && nowRanking[0].score < rankingData.score) {
      for (let i = 0; i < nowRanking.length; i++) {
        await this.rankingModel.findByIdAndUpdate(nowRanking[i]._id, { $set: { rank: i + 2 } });
      }
      const listingRank = await this.rankingModel.create({ ...rankingData, rank: 1 });
      return listingRank;
    }
    // 이진탐색 Rank임
    const index = binarySearch(nowRanking, rankingData);
    console.log(index, '함수실행결과');
    // 만약 위 이진탐색에서 같은 값이 나온 경우 그 후순위에 위치해야하기 떄문에
    // 결과값이후 바로 새로운 랭킹에 등재시키고, 그 후의 랭킹은 전부 +1 해주어야함
    if (index.equal === true || index.type === '작음') {
      console.log('작음시작');
      for (let i = index.index; i < nowRanking.length - 1; i++) {
        const data = nowRanking[i + 1];
        // console.log(data.rank, ' => ', data.rank + 1);
        await this.rankingModel.findByIdAndUpdate(data._id, { $set: { rank: data.rank + 1 } });
      }
      const listingRank = await this.rankingModel.create({ ...rankingData, rank: index.index + 2 });
      return listingRank;
      // 그게아니라면 그냥 인덱스 자리에 넣으면 끝
    } else if (index.type === '큼') {
      console.log('큼시작');
      // console.log('등재될 랭킹은 ', index.index + 1, '등임.');
      for (let i = index.index; i < nowRanking.length; i++) {
        const data = nowRanking[i];
        await this.rankingModel.findByIdAndUpdate(data._id, { $set: { rank: data.rank + 1 } });
      }
      const listingRank = await this.rankingModel.create({ ...rankingData, rank: index.index + 1 });
      return listingRank;
    }
    throw new HttpException('오류', HttpStatus.INTERNAL_SERVER_ERROR);
  }

  async getGamerRank() {
    const rankList = await this.rankingModel.find({}).sort({ rank: 1 }).limit(100);
    return rankList;
  }

  async remove() {
    await this.rankingModel.deleteMany({});
    return;
  }
}

export const binarySearch = (arr: Ranking[], target: CreateRankingDto) => {
  let left = 0;
  let right = arr.length - 1;
  let mid = 0;
  let cnt = 0;
  let type = '';
  while (left <= right) {
    ++cnt;
    mid = Math.floor((left + right) / 2);
    if (arr[mid].score === target.score) {
      console.log(cnt, '번');
      return { index: mid, equal: true };
    } else if (arr[mid].score < target.score) {
      right = mid - 1;
      type = '큼';
    } else if (arr[mid].score > target.score) {
      left = mid + 1;
      type = '작음';
    }
  }
  // console.log(cnt, '번');
  return { index: mid, equal: false, type }; //마지막으로 대조했던 index 반환
};
