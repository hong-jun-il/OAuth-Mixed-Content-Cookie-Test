import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { randomBytes } from 'crypto';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class NaverService {
  constructor(private readonly httpService: HttpService) {}

  getNaverAuthURL(): string {
    const clientId = process.env.NAVER_OAUTH_CLIENT_ID;
    const redirectUri = process.env.NAVER_OAUTH_CALLBACK_URL;
    const state = randomBytes(16).toString('hex');

    return `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}&state=${state}`;
  }

  async getNaverToken(code: string) {
    const clientId = process.env.NAVER_OAUTH_CLIENT_ID;
    const clientSecret = process.env.NAVER_OAUTH_CLIENT_SECRETS;
    const redirectUri = process.env.NAVER_OAUTH_CALLBACK_URL;
    const state = randomBytes(16).toString('hex');

    const res = await firstValueFrom(
      this.httpService.get(
        `https://nid.naver.com/oauth2.0/token?grant_type=authorization_code&client_id=${clientId}&client_secret=${clientSecret}&redirect_uri=${redirectUri}&code=${code}&state=${state}`,
        {
          headers: {
            'X-Naver-Client-Id': clientId,
            'X-Naver-Client-Secret': clientSecret,
          },
        },
      ),
    );

    return res.data;
  }

  async getNaverUser(accessToken: string) {
    const res = await firstValueFrom(
      this.httpService.get('https://openapi.naver.com/v1/nid/me', {
        headers: { Authorization: `Bearer ${accessToken}` },
      }),
    );

    return res.data;
  }
}
