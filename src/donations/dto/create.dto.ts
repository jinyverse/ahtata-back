import { Field, InputType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger/dist/decorators/api-property.decorator';

@InputType()
export class CreateDonationsDto {
  @ApiProperty({
    example: '지니나무',
    description: 'text',
  })
  text: string;

  @ApiProperty({
    example: 512.854,
    description: 'givePoint',
  })
  givePoint: number;

  @ApiProperty({
    example: 59,
    description: 'nickname',
  })
  nickname: string;
}
//
