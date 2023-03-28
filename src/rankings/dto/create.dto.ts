import { Field, InputType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger/dist/decorators/api-property.decorator';

@InputType()
export class CreateRankingDto {
  @ApiProperty({
    example: '지니나무',
    description: 'nickname',
  })
  nickname: string;

  @ApiProperty({
    example: 512.854,
    description: 'score',
  })
  score: number;
}
//
