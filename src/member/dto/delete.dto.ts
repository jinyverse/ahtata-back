import { Field, InputType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger/dist/decorators/api-property.decorator';

@InputType()
export class DeleteMemberDto {
  @Field(() => String)
  @ApiProperty({
    example: 'we1231325325EGeg12334',
    description: 'memberId',
  })
  memberId: string;
}
//
