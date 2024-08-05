declare namespace NodeJS {
  interface ProcessEnv {
    PORT: string;
    HOST: string;
    DATABASE_URL: string;
  }
}
