import { Body, Controller, Post, Delete } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateDonationsDto } from './dto/create.dto';
import { DeleteDonationsDto } from './dto/delete.dto';
import { DonationsService } from './donations.service';

@Controller('donations')
@ApiTags('응원메시지 관련 API')
export class DonationsController {
  constructor(private DonationsService: DonationsService) {}

  @Post()
  @ApiOperation({ summary: '응원메시지 저장', description: '바디값 채워서 보내기' })
  @ApiCreatedResponse({ status: 201, description: '저장된 donationsId 반환', type: String })
  async createData(@Body() Donations: CreateDonationsDto) {
    try {
      const result = await this.DonationsService.createDonations(Donations);
      return result;
    } catch (err) {
      console.log(err);
    }
  }

  @Delete()
  @ApiOperation({ summary: '응원메시지 ID로 메시지 삭제', description: '응원메시지 ID를 donationsId로 body로 보내세요.' })
  @ApiCreatedResponse({ status: 200, description: '응원메시지 삭제', type: Boolean })
  async delete(@Body() data: DeleteDonationsDto): Promise<boolean> {
    const donationsId = data.donationsId;
    const nickname = data.nickname;
    try {
      const deleteDonations = await this.DonationsService.deleteDonations(donationsId, nickname);
      return deleteDonations;
    } catch (err) {
      console.log(err.message);
    }
  }
}