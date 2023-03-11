import { Body, Controller, Delete, Get, Post, Query } from '@nestjs/common';
import { CreateMemberDto } from './dto/create.dto';
import { MemberService } from './member.service';
import { Member } from './schemas/members.schema';

@Controller('members')
export class MemberController {
  constructor(private memberService: MemberService) {}

  @Get()
  async getMemberInfo(@Query('memberId') memberId: string): Promise<Member> {
    try {
      const member = await this.memberService.getMember(memberId);
      return member;
    } catch (err) {
      console.log(err.message);
    }
  }

  @Get('/all')
  async getAllMembers(): Promise<Member[]> {
    const members = await this.memberService.getAllMembers();
    return members;
  }

  @Post()
  async addMember(@Body() createData: CreateMemberDto): Promise<boolean> {
    try {
      const addNewMember = await this.memberService.addMember(createData);
      return addNewMember;
    } catch (err) {
      console.log(err.message);
    }
  }

  @Post('/login')
  async login(@Body() loginData: CreateMemberDto): Promise<Member> {
    try {
      const member = await this.memberService.login(loginData);
      return member;
    } catch (err) {
      console.log(err);
    }
  }

  @Delete()
  async delete(@Body('memberId') id: string) {
    try {
      const deleteMember = await this.memberService.deleteMember(id);
      return deleteMember;
    } catch (err) {
      console.log(err.message);
    }
  }
}
