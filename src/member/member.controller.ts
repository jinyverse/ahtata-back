import { Body, Controller, Delete, Get, Post, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger/dist';
import { ApiCreatedResponse } from '@nestjs/swagger/dist/decorators';
import { ApiProperty } from '@nestjs/swagger/dist/decorators/api-property.decorator';
import { CreateMemberDto } from './dto/create.dto';
import { DeleteMemberDto } from './dto/delete.dto';
import { MemberService } from './member.service';
import { Member } from './schemas/members.schema';

@Controller('members')
@ApiTags('유저 관련 API')
export class MemberController {
  constructor(private memberService: MemberService) {}

  @Get()
  @ApiOperation({ summary: '유저ID로 유저정보 받기', description: '유저 ID를 Query로 보내세요.' })
  @ApiCreatedResponse({ status: 200, description: '유저ID로 유저정보찾기', type: Member })
  async getMemberInfo(@Query('memberId') memberId: string): Promise<Member> {
    try {
      const member = await this.memberService.getMember(memberId);
      return member;
    } catch (err) {
      console.log(err.message);
    }
  }

  @Get('/all')
  @ApiOperation({ summary: '모든 유저 정보' })
  @ApiCreatedResponse({ status: 200, type: [Member] })
  async getAllMembers(): Promise<Member[]> {
    const members = await this.memberService.getAllMembers();
    return members;
  }

  @Post()
  @ApiOperation({ summary: '회원가입', description: 'nickname , password를 body로 보내세요. nickname 중복시 오류뜹니다.' })
  @ApiCreatedResponse({ status: 201, type: [Member] })
  async addMember(@Body() createData: CreateMemberDto): Promise<boolean> {
    try {
      const addNewMember = await this.memberService.addMember(createData);
      return addNewMember;
    } catch (err) {
      console.log(err.message);
    }
  }

  @Post('/login')
  @ApiOperation({ summary: '로그인', description: 'nickname, password를 string으로 바디에 담아 보내세요.' })
  @ApiCreatedResponse({ status: 200, description: '로그인완료시', type: Member })
  async login(@Body() loginData: CreateMemberDto): Promise<Member> {
    try {
      const member = await this.memberService.login(loginData);
      return member;
    } catch (err) {
      console.log(err);
    }
  }

  @Delete()
  @ApiOperation({ summary: '유저ID로 유저삭제', description: '유저 ID를 memberId로 body로 보내세요.' })
  @ApiCreatedResponse({ status: 200, description: '유저탈퇴', type: Boolean })
  async delete(@Body() data: DeleteMemberDto): Promise<boolean> {
    const memberId = data.memberId;
    try {
      const deleteMember = await this.memberService.deleteMember(memberId);
      return deleteMember;
    } catch (err) {
      console.log(err.message);
    }
  }
}
