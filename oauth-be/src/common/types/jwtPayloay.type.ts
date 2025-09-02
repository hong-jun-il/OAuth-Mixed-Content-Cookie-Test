import { ProviderType } from './provider.type';

export type JWTPayloadType = {
  sub: number;
  provider: ProviderType;
  email?: string;
  name?: string;
};
