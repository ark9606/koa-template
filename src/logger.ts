import * as winston from 'winston';
import { config } from './config';
import { Context } from 'koa';
const format = winston.format;
const transports = winston.transports;

export function logger(): (c: Context, next: () => Promise<any>) => void {
  winston.configure({
    level: config.isDevelopment ? 'debug' : 'info',
    transports: [
      new transports.File({ filename: 'logs/error.log', level: 'error' }),
      new transports.Console({ format: format.combine(format.colorize(), format.simple()) }),
    ],
  });

  return async (ctx: Context, next: () => Promise<any>) => {
    const start = new Date().getMilliseconds();

    await next();

    const ms = new Date().getMilliseconds() - start;

    let logLevel = 'info';
    if (ctx.status >= 400) {
      logLevel = 'warn';
    }
    if (ctx.status >= 500) {
      logLevel = 'error';
    }

    const msg = `${ctx.method} ${ctx.originalUrl} ${ctx.status} ${ms}ms`;
    winston.log(logLevel, msg);
  };
}
