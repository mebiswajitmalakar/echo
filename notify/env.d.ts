declare namespace NodeJS {
  interface ProcessEnv {
    PORT: string;
    HOST: string;
    RESEND_API_KEY: string;
    NODE_ENV: string;
  }
}
