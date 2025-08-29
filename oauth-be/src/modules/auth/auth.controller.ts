import { Controller, Get, Req, Res } from '@nestjs/common';
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
    private readonly naverService: NaverService,
    private readonly kakaoService: KakaoService,
  ) {}

  @Get('github')
  async githubLogin(@Res() res: Response) {
    const githubAuthUrl = this.githubService.getGithubAuthUrl();
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
    const googleAuthUrl = this.googleService.getGoogleAuthIrl();
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
}
