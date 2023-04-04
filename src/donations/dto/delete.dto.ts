import { Field, InputType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger/dist/decorators/api-property.decorator';

@InputType()
export class DeleteDonationsDto {
  @Field(() => String)
  @ApiProperty({
    example: 'we1231325325EGeg12334',
    description: 'DonationsId',
  })
  donationsId: string;

  @ApiProperty({
    example: '지니나무',
    description: 'nickname',
  })
  nickname: string;
}
//
