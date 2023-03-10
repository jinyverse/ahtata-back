import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateMemberDto {
  @Field(() => String)
  nickname: string;

  @Field(() => String)
  password: string;
}
//
