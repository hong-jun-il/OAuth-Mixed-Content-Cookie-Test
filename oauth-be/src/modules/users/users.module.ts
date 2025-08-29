import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UserService } from './providers/user.service';
import { UserProviderService } from './providers/user-provider.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/common/entites/01_user.entity';
import { UserProviderEntity } from 'src/common/entites/02_user_provider.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, UserProviderEntity])],
  controllers: [UsersController],
  providers: [UserService, UserProviderService],
  exports: [UserService, UserProviderService],
})
export class UsersModule {}
