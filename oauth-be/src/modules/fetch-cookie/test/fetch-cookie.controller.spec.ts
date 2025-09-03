import { Test, TestingModule } from '@nestjs/testing';
import { FetchCookieController } from '../fetch-cookie.controller';
import { FetchCookieService } from '../fetch-cookie.service';

describe('FetchCookieController', () => {
  let controller: FetchCookieController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FetchCookieController],
      providers: [FetchCookieService],
    }).compile();

    controller = module.get<FetchCookieController>(FetchCookieController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
