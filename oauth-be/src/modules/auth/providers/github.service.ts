import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { randomBytes } from 'crypto';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class GithubService {
  constructor(private readonly httpService: HttpService) {}

  getGithubAuthURL(): string {
    const clientId = process.env.GITHUB_OAUTH_CLIENT_ID;
    const redirectUri = process.env.GITHUB_OAUTH_CALLBACK_URL;
    const scope = 'user:email';
    const state = randomBytes(16).toString('hex');

    return `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}&state=${state}`;
  }

  async getGithubAccessToken(code: string) {
    const clientId = process.env.GITHUB_OAUTH_CLIENT_ID;
    const clientSecret = process.env.GITHUB_OAUTH_CLIENT_SECRETS;

    const res = await firstValueFrom(
      this.httpService.post(
        `https://github.com/login/oauth/access_token`,
        { client_id: clientId, client_secret: clientSecret, code },
        {
          headers: {
            Accept: 'application/json',
          },
        },
      ),
    );

    const accessToken = res.data.access_token;

    return accessToken;
  }

  async getGithubUser(accessToken: string) {
    const res = await firstValueFrom(
      this.httpService.get('https://api.github.com/user', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }),
    );

    return res.data;
  }
}
