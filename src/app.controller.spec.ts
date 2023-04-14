import { Test, TestingModule } from '@nestjs/testing';
import { AppController, sleep } from './app.controller';
import { AppService } from './app.service';
import { HttpException, HttpStatus } from '@nestjs/common';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });
  describe('sleep 함수 테스트', () => {
    it('sleep 1초, 5초', () => {
      expect(sleep(1)).toEqual(1);
      expect(sleep(5)).toEqual(5);

      let msg = '';
      expect(() => {
        try {
          sleep(11);
        } catch (err) {
          msg = err.message;
          throw new Error(err.message);
        }
      }).toThrow(msg);
    });
  });
});
