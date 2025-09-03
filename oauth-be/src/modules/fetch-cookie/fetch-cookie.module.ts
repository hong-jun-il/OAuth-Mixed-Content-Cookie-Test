import { Module } from '@nestjs/common';
import { FetchCookieService } from './fetch-cookie.service';
import { FetchCookieController } from './fetch-cookie.controller';

@Module({
  controllers: [FetchCookieController],
  providers: [FetchCookieService],
})
export class FetchCookieModule {}
