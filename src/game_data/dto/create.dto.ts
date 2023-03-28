import { Field, InputType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger/dist/decorators/api-property.decorator';

@InputType()
export class CreateGameDataDto {
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

  @ApiProperty({
    example: 59,
    description: 'clearTime',
  })
  clearTime: string;

  @ApiProperty({
    example: 5,
    description: 'answerCount',
  })
  answerCount: number;

  @ApiProperty({
    example: '아이유',
    description: 'playArtist',
  })
  playArtist: string;
}
//
