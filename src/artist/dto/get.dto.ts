import { Field, InputType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger/dist/decorators/api-property.decorator';

@InputType()
export class GetArtistDto {
  @ApiProperty({
    example: '1 or -1 ,  1이 ASC, 2가 DISC',
    description: 'sortType',
  })
  sortType: number;

  @ApiProperty({
    example: 'rank or name',
    description: 'sortColumn',
  })
  sortColumn: string;

  @ApiProperty({
    example: '마지막데이터의 artistName 또는 dukPoint, 처음이라면 first',
    description: 'curser',
  })
  curser: string;
}
//
