import { Test, TestingModule } from '@nestjs/testing';
import { FetchCookieService } from '../fetch-cookie.service';

describe('FetchCookieService', () => {
  let service: FetchCookieService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FetchCookieService],
    }).compile();

    service = module.get<FetchCookieService>(FetchCookieService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
