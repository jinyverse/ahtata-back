import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MemberResolver } from './member.resolver';
import { MemberService } from './member.service';
import { Member, MemberSchema } from './schemas/members.schema';
import { MemberController } from './member.controller';

@Module({
  imports: [MongooseModule.forFeature([{ name: Member.name, schema: MemberSchema }])],
  providers: [MemberService, MemberResolver],
  controllers: [MemberController],
})
export class MemberModule {}
