import * as dotenv from 'dotenv';
import {
  EnvConfig,
  Logger,
  validateConfig,
  HttpError,
} from '@ipcortex/commons';
import { IsString } from 'class-validator';

dotenv.config();
const logger = Logger('service-template-v2:Config.ts');

class ServiceEnvConfig extends EnvConfig {
  @IsString()
  DATABASE_URL!: string;
}

export const config = (() => {
  try {
    return validateConfig<ServiceEnvConfig>(
      process.env,
      ServiceEnvConfig,
    ) as ServiceEnvConfig;
  } catch (e) {
    logger.error(e instanceof Error ? e.message : e);
    throw new HttpError('Invalid configuration', 500, { e });
  }
})();
