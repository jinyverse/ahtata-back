import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateMemberDto } from './dto/create.dto';
import { MemberService } from './member.service';
import { Member } from './schemas/members.schema';

@Resolver()
export class MemberResolver {
  constructor(private memberService: MemberService) {}

  @Query(() => Member)
  async memberInfo(@Args('memberId') memberId: string) {
    try {
      const member = await this.memberService.getMember(memberId);
      return member;
    } catch (err) {
      console.log(err);
    }
  }

  @Query(() => [Member])
  async getAllMembers() {
    const members = await this.memberService.getAllMembers();
    return members;
  }

  @Mutation(() => Boolean)
  async addMember(@Args('addInput') createData: CreateMemberDto) {
    try {
      const newMember = await this.memberService.addMember(createData);
      return newMember;
    } catch (err) {
      console.log(err.message);
    }
  }

  @Mutation(() => Member)
  async login(@Args('loginInput') loginData: CreateMemberDto) {
    try {
      const member = await this.memberService.login(loginData);
      return member;
    } catch (err) {
      console.log(err.message);
    }
  }

  @Mutation(() => Boolean)
  async removeMember(@Args('memberId') memberId: string) {
    try {
      const result = await this.memberService.deleteMember(memberId);
      return result;
    } catch (err) {
      console.log(err.message);
    }
  }
}
