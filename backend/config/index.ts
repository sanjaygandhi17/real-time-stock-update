export type Config = {
  APP_ENVIRONMENT: string;
  SERVICE_PORT: number;
  MONGODB_URI:string;
};

export default {
  APP_ENVIRONMENT: process.env.APP_ENVIRONMENT || 'dev',
  SERVICE_PORT: Number(process.env.SERVICE_PORT) || 8090,
  MONGODB_URI: process.env.MONGODB_URI,
} as Config;
