import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { randomBytes } from 'crypto';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class GoogleService {
  constructor(private readonly httpService: HttpService) {}

  getGoogleAuthURL(): string {
    const clientId = process.env.GOOGLE_OAUTH_CLIENT_ID;
    const redirectUri = process.env.GOOGLE_OAUTH_CALLBACK_URL;
    const scope = 'email';
    const state = randomBytes(16).toString('hex');

    return `https://accounts.google.com/o/oauth2/v2/auth?scope=${scope}&response_type=code&state=${state}&redirect_uri=${redirectUri}&client_id=${clientId}&access_type=offline&prompt=consent`;
  }

  async getGoogleTokens(code: string) {
    const clientId = process.env.GOOGLE_OAUTH_CLIENT_ID;
    const clientSecret = process.env.GOOGLE_OAUTH_CLIENT_SECRETS;
    const redirectUri = process.env.GOOGLE_OAUTH_CALLBACK_URL;

    const res = await firstValueFrom(
      this.httpService.post(
        'https://oauth2.googleapis.com/token',
        {
          code,
          client_id: clientId,
          client_secret: clientSecret,
          redirect_uri: redirectUri,
          grant_type: 'authorization_code',
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

  async getGoogleUser(accessToken: string) {
    const res = await firstValueFrom(
      this.httpService.get('https://www.googleapis.com/oauth2/v2/userinfo', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }),
    );

    return res.data;
  }
}
