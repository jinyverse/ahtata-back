import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async getHello() {
    return this.appService.getHello();
  }
}
export const sleep = (second: number) => {
  let sleepTime = second * 1000;
  if (second === 0) {
    sleepTime = Math.round(Math.random() * 1) * 1000;
  }
  const wakeUpTime = Date.now() + sleepTime;
  console.log((wakeUpTime - Date.now()) / 1000, '초 만큼 잔다~');
  while (Date.now() < wakeUpTime) {}
  return;
};
