import { DatabaseConfig } from 'src/database/config/database-config.type';
import { AppConfig } from './app-config';
import { AuthConfig } from 'src/Auth/config/auth-config.type';

export type AllConfigType = {
  app: AppConfig;
  auth: AuthConfig;
  database: DatabaseConfig;
};
