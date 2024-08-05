declare namespace NodeJS {
  interface ProcessEnv {
    PORT: string;
    HOST: string;
    DATABASE_URL: string;
    JWT_SECRET: string;
    JWT_ALGORITHM: string;
    NODE_ENV: string;
  }
}
