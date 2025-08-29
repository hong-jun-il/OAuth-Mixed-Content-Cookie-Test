import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserProviderEntity } from 'src/common/entites/02_user_provider.entity';
import { ProviderType } from 'src/common/types/provider.type';
import { Repository } from 'typeorm';
import { UserProviderDto } from '../../../common/dto/02_user-provider.dto';

@Injectable()
export class UserProviderService {
  constructor(
    @InjectRepository(UserProviderEntity)
    private readonly userProviderRepo: Repository<UserProviderEntity>,
  ) {}

  async findUserProvider(provider_id: string, provider: ProviderType) {
    return this.userProviderRepo.findOne({
      where: {
        provider_id,
        provider,
      },
    });
  }

  async createUserProvider(userProviderInfo: UserProviderDto) {
    return this.userProviderRepo.save(userProviderInfo);
  }

  async updateTokens(userProviderInfo: UserProviderDto) {
    const existingUserProvider = await this.userProviderRepo.findOne({
      where: {
        provider_id: userProviderInfo.provider_id,
        provider: userProviderInfo.provider,
      },
    });

    if (!existingUserProvider) {
      throw new NotFoundException(
        `UserProvider not found for user_id ${userProviderInfo.provider_id} and provider ${userProviderInfo.provider}`,
      );
    }

    existingUserProvider.access_token = userProviderInfo.access_token;

    if (userProviderInfo.refresh_token) {
      existingUserProvider.refresh_token = userProviderInfo.refresh_token;
    }

    if (userProviderInfo.token_expires_at) {
      existingUserProvider.token_expires_at = userProviderInfo.token_expires_at;
    }

    return this.userProviderRepo.save(existingUserProvider);
  }
}
