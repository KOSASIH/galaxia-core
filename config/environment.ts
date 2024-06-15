import { Env } from './env.interface';

const env: Env = {
  // Environment variables
  NODE_ENV: process.env.NODE_ENV || 'development',
  GALAXIA_CHAIN_ID: process.env.GALAXIA_CHAIN_ID || 'galaxia-mainnet',
  GALAXIA_RPC_URL: process.env.GALAXIA_RPC_URL || 'https://galaxia-rpc.com',
  GALAXIA_WS_URL: process.env.GALAXIA_WS_URL || 'wss://galaxia-ws.com',
  GALAXIA_EXPLORER_URL: process.env.GALAXIA_EXPLORER_URL || 'https://galaxia-explorer.com',

  // API keys and secrets
  GALAXIA_API_KEY: process.env.GALAXIA_API_KEY || 'YOUR_API_KEY',
  GALAXIA_API_SECRET: process.env.GALAXIA_API_SECRET || 'YOUR_API_SECRET',

  // Database settings
  DATABASE_URL: process.env.DATABASE_URL || 'ongodb://localhost:27017/galaxia',
  DATABASE_USERNAME: process.env.DATABASE_USERNAME || 'galaxia',
  DATABASE_PASSWORD: process.env.DATABASE_PASSWORD || 'galaxia123',

  // Cache settings
  CACHE_TTL: process.env.CACHE_TTL || 3600, // 1 hour
  CACHE_MAX_SIZE: process.env.CACHE_MAX_SIZE || 1000,

  // Logging settings
  LOG_LEVEL: process.env.LOG_LEVEL || 'debug',
  LOG_FORMAT: process.env.LOG_FORMAT || 'json',
};

export default env;
