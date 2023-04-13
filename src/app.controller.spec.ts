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

  describe('/로 접근시', () => {
    it('헬로우 월드가 출력되어야 함', async () => {
      expect(await appController.getHello()).toEqual('Hello World!');
    });
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
  //이게 변경인건데??
  // 변경점이 있지롱~~
  // 또 변경하기
  // spec 변경
});
