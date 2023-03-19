import { Field, InputType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger/dist/decorators/api-property.decorator';

@InputType()
export class CreateMemberDto {
  @Field(() => String)
  @ApiProperty({
    example: '지니나무짱짱맨',
    description: 'nickname',
  })
  nickname: string;

  @Field(() => String)
  @ApiProperty({
    example: '123123',
    description: 'password',
  })
  password: string;
}
//
