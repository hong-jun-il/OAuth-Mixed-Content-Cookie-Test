import { ProviderType } from './provider.type';

export type createUserProviderType = {
  provider_id: string;
  provider: ProviderType;
  user_name?: string;
  access_token: string;
  token_expires_at?: Date;
  refresh_token?: string;
};
