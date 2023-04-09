import { Controller, Get, HttpException, HttpStatus } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async getHello() {
    const a = sleep(1);
    console.log(a);
    return this.appService.getHello();
  }
}
export const sleep = (second: number) => {
  let sleepTime = second * 1000;
  if (second === 0) {
    sleepTime = Math.round(Math.random() * 1) * 1000;
  }
  if (second > 10) throw new HttpException('10초 이하로만 잘 수 있습니다.', HttpStatus.BAD_REQUEST);
  const wakeUpTime = Date.now() + sleepTime;
  const result = (wakeUpTime - Date.now()) / 1000;
  console.log(result, '초 만큼 잔다~');
  while (Date.now() < wakeUpTime) {}
  return result;
};
