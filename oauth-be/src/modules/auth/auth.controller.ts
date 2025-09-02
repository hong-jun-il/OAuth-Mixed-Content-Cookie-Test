import {
  Controller,
  Get,
  Req,
  Res,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Request, Response } from 'express';
import { GithubService } from './providers/github.service';
import { GoogleService } from './providers/google.service';
import { NaverService } from './providers/naver.service';
import { KakaoService } from './providers/kakao.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly githubService: GithubService,
    private readonly googleService: GoogleService,
    private readonly kakaoService: KakaoService,
    private readonly naverService: NaverService,
  ) {}

  @Get('refresh-token')
  async refreshToken(@Req() req: Request) {
    const cookie = req.cookies;
    const refreshToken = cookie['refresh_token'];

    if (!refreshToken) {
      throw new UnauthorizedException('Refresh token not found');
    }

    const serverAccessToken = await this.authService.refreshToken(refreshToken);

    return {
      message: '액세스 토큰 재발급 성공',
      data: serverAccessToken,
    };
  }

  @Get('github')
  async githubLogin(@Res() res: Response) {
    const githubAuthUrl = this.githubService.getGithubAuthURL();
    res.redirect(githubAuthUrl);

    return { message: '깃허브 로그인 페이지로 redirect 성공' };
  }

  @Get('github/callback')
  async githubCallback(@Req() req: Request, @Res() res: Response) {
    const code = req.query.code as string;

    const { serverAccessToken, serverRefreshToken, redirectUrl } =
      await this.authService.handleGithubLogin(code);

    res.cookie('access_token', serverAccessToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      maxAge: 60 * 1000 * 60,
    });

    res.cookie('refresh_token', serverRefreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      maxAge: 60 * 1000 * 60 * 24 * 7,
    });

    res.redirect(redirectUrl);

    return { message: '깃허브 로그인 성공' };
  }

  @Get('google')
  async googleLogin(@Res() res: Response) {
    const googleAuthUrl = this.googleService.getGoogleAuthURL();
    res.redirect(googleAuthUrl);

    return { message: '구글 로그인 페이지로 redirect 성공' };
  }

  @Get('google/callback')
  async googleCallback(@Req() req: Request, @Res() res: Response) {
    const code = req.query.code as string;

    const { serverAccessToken, serverRefreshToken, redirectUrl } =
      await this.authService.handleGoogleLogin(code);

    res.cookie('access_token', serverAccessToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      maxAge: 60 * 1000 * 60,
    });

    res.cookie('refresh_token', serverRefreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      maxAge: 60 * 1000 * 60 * 24 * 7,
    });

    res.redirect(redirectUrl);

    return { message: '구글 로그인 성공' };
  }

  @Get('kakao')
  async kakaoLogin(@Res() res: Response) {
    const kakaoAuthUrl = this.kakaoService.getKakaoAuthURL();
    res.redirect(kakaoAuthUrl);

    return { message: '카카오 로그인 페이지로 redirect 성공' };
  }

  @Get('kakao/callback')
  async kakaoCallback(@Req() req: Request, @Res() res: Response) {
    const code = req.query.code as string;

    const { serverAccessToken, serverRefreshToken, redirectUrl } =
      await this.authService.handlekakaoLogin(code);

    res.cookie('access_token', serverAccessToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      maxAge: 60 * 1000 * 60,
    });

    res.cookie('refresh_token', serverRefreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      maxAge: 60 * 1000 * 60 * 24 * 7,
    });

    res.redirect(redirectUrl);

    return { message: '카카오 로그인 성공' };
  }

  @Get('naver')
  async naverLogin(@Res() res: Response) {
    const naverAuthUrl = this.naverService.getNaverAuthURL();
    res.redirect(naverAuthUrl);

    return { message: '네이버 로그인 페이지로 redirect 성공' };
  }

  @Get('naver/callback')
  async naverCallback(@Req() req: Request, @Res() res: Response) {
    const code = req.query.code as string;

    const { serverAccessToken, serverRefreshToken, redirectUrl } =
      await this.authService.handleNaverLogin(code);

    res.cookie('access_token', serverAccessToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      maxAge: 60 * 1000 * 60,
    });

    res.cookie('refresh_token', serverRefreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      maxAge: 60 * 1000 * 60 * 24 * 7,
    });

    res.redirect(redirectUrl);

    return { message: '네이버 로그인 성공' };
  }
}
