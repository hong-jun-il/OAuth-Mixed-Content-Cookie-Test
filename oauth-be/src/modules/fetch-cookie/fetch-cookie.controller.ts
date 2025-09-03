import { Controller, Get, Res } from '@nestjs/common';
import { FetchCookieService } from './fetch-cookie.service';
import { Response } from 'express';

@Controller('fetch-cookie')
export class FetchCookieController {
  constructor(private readonly fetchCookieService: FetchCookieService) {}

  @Get()
  async fetchCookie(@Res() res: Response) {
    res.cookie('test_cookie', 'test', {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      maxAge: 60 * 1000 * 60,
    });

    return res.status(200).json({
      message: '쿠키 가져오기 성공',
    });
  }
}
