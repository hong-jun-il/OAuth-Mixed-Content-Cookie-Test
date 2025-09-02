import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { randomBytes } from 'crypto';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class KakaoService {
  constructor(private readonly httpService: HttpService) {}

  getKakaoAuthURL(): string {
    const clientId = process.env.KAKAO_OAUTH_CLIENT_ID;
    const redirectUri = process.env.KAKAO_OAUTH_CALLBACK_URL;
    const scope = 'profile_nickname';
    const state = randomBytes(16).toString('hex');

    return `https://kauth.kakao.com/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=${scope}&state=${state}`;
  }

  async getKakaoTokens(code: string) {
    const clientId = process.env.KAKAO_OAUTH_CLIENT_ID;
    const clientSecret = process.env.KAKAO_OAUTH_CLIENT_SECRETS;
    const redirectUri = process.env.KAKAO_OAUTH_CALLBACK_URL;

    const res = await firstValueFrom(
      this.httpService.post(
        'https://kauth.kakao.com/oauth/token',
        {
          grant_type: 'authorization_code',
          client_id: clientId,
          client_secret: clientSecret,
          redirect_uri: redirectUri,
          code,
        },
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        },
      ),
    );

    return res.data;
  }

  async getKakaoUser(accessToken: string) {
    const res = await firstValueFrom(
      this.httpService.get('https://kapi.kakao.com/v2/user/me', {
        headers: {
          'content-type': 'application/x-www-form-urlencoded',
          Authorization: `Bearer ${accessToken}`,
        },
      }),
    );

    return res.data;
  }
}
