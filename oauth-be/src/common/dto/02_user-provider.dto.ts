import { Type } from 'class-transformer';
import { IsDate, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ProviderType } from 'src/common/types/provider.type';

export class UserProviderDto {
  @IsString()
  @IsNotEmpty()
  provider_id: string;

  @IsString()
  @IsNotEmpty()
  provider: ProviderType;

  @IsString()
  @IsNotEmpty()
  user_name: string;

  @IsString()
  @IsNotEmpty()
  access_token: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  refresh_token?: string;

  @IsOptional()
  @Type(() => Date)
  @IsDate()
  token_expires_at?: Date;
}
