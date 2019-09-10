import Koa, { Context } from 'koa';
import bodyParser from 'koa-bodyparser';
import router from './routes';
import { config } from './config';
import { logger } from './logger';
import { createConnection } from 'typeorm';

async function setup() {
  await createConnection();

  const app = new Koa();

  app.use(logger());

  app.use(async (ctx: Context, next) => {
    try {
      await next();
    } catch (err) {
      err.status = err.statusCode || err.status || 500;
      ctx.body = {
        status: err.status,
        error: err.message,
      };
      ctx.status = err.status;
      // ctx.app.emit('error', err, ctx);
    }
  });

  app.use(bodyParser({}));

  app.use(router.routes());
  app.use(router.allowedMethods());

  app.listen(config.port, () => {
    console.log(`App started at port ${config.port}`);
  });
}

setup();
