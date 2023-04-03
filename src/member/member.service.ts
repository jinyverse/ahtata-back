import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Member, MemberDocument } from './schemas/members.schema';
import * as bcrypt from 'bcrypt';
import { CreateMemberDto } from './dto/create.dto';
import { sleep } from 'src/app.controller';

@Injectable()
export class MemberService {
  constructor(
    @InjectModel(Member.name)
    private memberModel: Model<MemberDocument>,
  ) {}

  async getMember(id: string): Promise<Member> {
    const member = await this.memberModel.findById(id);
    sleep(3);
    return member;
  }

  async getAllMembers(): Promise<Member[]> {
    const members = await this.memberModel.find({});
    return members;
  }

  async addMember(createData: CreateMemberDto) {
    const { password, nickname } = createData;
    const hashPassword = await bcrypt.hash(password, 10);
    const addNewMember = await this.memberModel.create({ nickname, password: hashPassword });
    console.log(addNewMember);
    return true;
  }

  async login(loginData: CreateMemberDto): Promise<Member> {
    const { password, nickname } = loginData;
    const member = await this.memberModel.findOne({ nickname });
    if (!member) throw new Error('존재하지 않음');
    if (member.isLoggedIn) throw new Error('이미 접속중인 유저임');
    const correctPassword = member.password;
    const isCorrect = await bcrypt.compare(password, correctPassword);
    if (!isCorrect) throw new Error('비번 불일치');
    const edit = await this.memberModel.findByIdAndUpdate(member.id, { $set: { isLoggedIn: true } });
    return member;
  }
  async logout(id: string) {
    const edit = await this.memberModel.findByIdAndUpdate(id, { $set: { isLoggedIn: false } });
    console.log(edit);
    return true;
  }

  async deleteMember(id: string) {
    await this.memberModel.findByIdAndDelete(id);
    return true;
  }
}
