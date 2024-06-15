interface Env {
  NODE_ENV: string;
  GALAXIA_CHAIN_ID: string;
  GALAXIA_RPC_URL: string;
  GALAXIA_WS_URL: string;
  GALAXIA_EXPLORER_URL: string;
  GALAXIA_API_KEY: string;
  GALAXIA_API_SECRET: string;
  DATABASE_URL: string;
  DATABASE_USERNAME: string;
  DATABASE_PASSWORD: string;
  CACHE_TTL: number;
  CACHE_MAX_SIZE: number;
  LOG_LEVEL: string;
  LOG_FORMAT: string;
}

export default Env;
