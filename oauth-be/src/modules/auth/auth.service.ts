import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { UserService } from '../users/providers/user.service';
import { UserProviderService } from '../users/providers/user-provider.service';
import { UserDto } from 'src/common/dto/01_user.dto';
import { ProviderType } from 'src/common/types/provider.type';
import { UserProviderDto } from 'src/common/dto/02_user-provider.dto';
import { GithubService } from './providers/github.service';
import { GoogleService } from './providers/google.service';
import { NaverService } from './providers/naver.service';
import { KakaoService } from './providers/kakao.service';
import { JwtService } from '@nestjs/jwt';
import { JWTPayloadType } from 'src/common/types/jwtPayloay.type';
import { createUserProviderType } from 'src/common/types/createUserProvider.type';

@Injectable()
export class AuthService {
  constructor(
    private readonly dataSource: DataSource,

    private readonly userService: UserService,

    private readonly userProviderService: UserProviderService,

    private readonly githubService: GithubService,

    private readonly googleService: GoogleService,

    private readonly naverService: NaverService,

    private readonly kakaoService: KakaoService,

    private jwtService: JwtService,
  ) {}

  async createUserOrUpdate({
    provider_id,
    provider,
    access_token,
    token_expires_at,
    refresh_token,
    name,
  }: createUserProviderType) {
    let userProvider = await this.userProviderService.findUserProvider(
      provider_id,
      provider,
    );

    const userProviderDto: UserProviderDto = {
      provider_id,
      provider,
      access_token,
      token_expires_at,
      refresh_token,
      name,
    };

    if (!userProvider) {
      userProvider =
        await this.userProviderService.createUserProvider(userProviderDto);
    } else {
      userProvider =
        await this.userProviderService.updateTokens(userProviderDto);
    }
  }

  async handleGithubLogin(code: string) {
    const providerAccessToken =
      await this.githubService.getGithubAccessToken(code);
    const githubUserInfo =
      await this.githubService.getGithubUser(providerAccessToken);

    // await this.createUserOrUpdate({
    //   provider_id: String(githubUserInfo.id),
    //   provider: 'Github',
    //   access_token: providerAccessToken,
    //   name: githubUserInfo.name,
    // });

    const payload: JWTPayloadType = {
      sub: githubUserInfo.id,
      email: githubUserInfo.email,
      name: githubUserInfo.name,
    };

    const [serverAccessToken, serverRefreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: process.env.JWT_SECRET,
        expiresIn: '1h',
      }),
      this.jwtService.signAsync(payload, {
        secret: process.env.JWT_SECRET,
        expiresIn: '7d',
      }),
    ]);

    return {
      serverAccessToken,
      serverRefreshToken,
      redirectUrl: `${process.env.FRONTEND_BASE_URL}/home`,
    };
  }

  async handleGoogleLogin(code: string) {
    const { access_token, expires_in, refresh_token } =
      await this.googleService.getToken(code);
    const googleUserInfo = await this.googleService.getGoogleUser(access_token);

    const token_expires_at = new Date(new Date().getTime() + 3600 * 1000);

    // await this.createUserOrUpdate({
    //   provider_id: googleUserInfo.id,
    //   provider: 'Google',
    //   access_token,
    //   token_expires_at,
    //   refresh_token,
    // });

    const payload: JWTPayloadType = {
      sub: googleUserInfo.id,
      email: googleUserInfo.email,
    };

    const [serverAccessToken, serverRefreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: process.env.JWT_SECRET,
        expiresIn: '1h',
      }),
      this.jwtService.signAsync(payload, {
        secret: process.env.JWT_SECRET,
        expiresIn: '7d',
      }),
    ]);

    return {
      serverAccessToken,
      serverRefreshToken,
      redirectUrl: `${process.env.FRONTEND_BASE_URL}/home`,
    };
  }
}
