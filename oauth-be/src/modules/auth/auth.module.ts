import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { HttpModule } from '@nestjs/axios';
import { GithubService } from './providers/github.service';
import { GoogleService } from './providers/google.service';
import { NaverService } from './providers/naver.service';
import { KakaoService } from './providers/kakao.service';
import { UsersModule } from '../users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/common/entites/01_user.entity';
import { UserProviderEntity } from 'src/common/entites/02_user_provider.entity';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    HttpModule,
    UsersModule,
    JwtModule,
    TypeOrmModule.forFeature([UserEntity, UserProviderEntity]),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    GithubService,
    GoogleService,
    NaverService,
    KakaoService,
  ],
})
export class AuthModule {}
