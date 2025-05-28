import dotenv from 'dotenv';

dotenv.config();

export const config = {
  port: process.env.PORT || 3000,
  nodeEnv: process.env.NODE_ENV || 'development',
  cacheTtl: parseInt(process.env.CACHE_TTL_SECONDS as string) || 300
};
