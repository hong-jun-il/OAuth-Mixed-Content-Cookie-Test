import { Injectable } from '@nestjs/common';
import { UserProviderService } from '../users/providers/user-provider.service';
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
    private readonly userProviderService: UserProviderService,

    private readonly githubService: GithubService,

    private readonly googleService: GoogleService,

    private readonly naverService: NaverService,

    private readonly kakaoService: KakaoService,

    private jwtService: JwtService,
  ) {}

  async refreshToken(refreshToken: string) {
    const { iat, exp, ...decodedPayload } = await this.jwtService.verifyAsync(
      refreshToken,
      {
        secret: process.env.JWT_SECRET,
      },
    );

    const serverAccessToken = await this.jwtService.signAsync(decodedPayload, {
      secret: process.env.JWT_SECRET,
      expiresIn: '1h',
    });

    return serverAccessToken;
  }

  async createUserOrUpdate({
    provider_id,
    provider,
    user_name,
    access_token,
    token_expires_at,
    refresh_token,
  }: createUserProviderType) {
    let userProvider = await this.userProviderService.findUserProvider(
      provider_id,
      provider,
    );

    const userProviderDto: UserProviderDto = {
      provider_id,
      provider,
      user_name,
      access_token,
      token_expires_at,
      refresh_token,
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

    await this.createUserOrUpdate({
      provider_id: String(githubUserInfo.id),
      provider: 'Github',
      user_name: githubUserInfo.name,
      access_token: providerAccessToken,
    });

    const payload: JWTPayloadType = {
      sub: githubUserInfo.id,
      provider: 'Github',
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
      await this.googleService.getGoogleTokens(code);

    const googleUserInfo = await this.googleService.getGoogleUser(access_token);

    const token_expires_at = new Date(new Date().getTime() + expires_in * 1000);

    await this.createUserOrUpdate({
      provider_id: googleUserInfo.id,
      provider: 'Google',
      access_token,
      token_expires_at,
      refresh_token,
    });

    const payload: JWTPayloadType = {
      sub: googleUserInfo.id,
      provider: 'Google',
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

  async handlekakaoLogin(code: string) {
    const {
      access_token,
      expires_in,
      refresh_token,
      // refresh_token_expires_in,
    } = await this.kakaoService.getKakaoTokens(code);

    const kakaoUserInfo = await this.kakaoService.getKakaoUser(access_token);

    const token_expires_at = new Date(new Date().getTime() + expires_in * 1000);

    await this.createUserOrUpdate({
      provider_id: kakaoUserInfo.id,
      provider: 'Kakao',
      access_token,
      token_expires_at,
      refresh_token,
    });

    const payload: JWTPayloadType = {
      sub: kakaoUserInfo.id,
      provider: 'Kakao',
      name: kakaoUserInfo.properties.nickname,
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

  async handleNaverLogin(code: string) {
    const { access_token, expires_in, refresh_token } =
      await this.naverService.getNaverToken(code);

    const naverUserInfo = await this.naverService.getNaverUser(access_token);

    const token_expires_at = new Date(
      new Date().getTime() + +expires_in * 1000,
    );

    await this.createUserOrUpdate({
      provider_id: naverUserInfo.response.id,
      provider: 'Naver',
      access_token,
      token_expires_at,
      refresh_token,
    });

    const payload: JWTPayloadType = {
      sub: naverUserInfo.response.id,
      provider: 'Naver',
      email: naverUserInfo.response.email,
      name: naverUserInfo.response.name,
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
