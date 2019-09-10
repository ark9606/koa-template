import * as dotenv from 'dotenv';
dotenv.config();

export const config = {
  port: (process.env.PORT && +(process.env.PORT)) || 3000,
  isDevelopment: process.env.NODE_ENV === 'development'
};
