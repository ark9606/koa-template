import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import router from './routes';
import { config } from './config';
import { logger } from './logger';

const app = new Koa();

app.use(logger());

app.use(bodyParser({}));

app.use(router.routes());
app.use(router.allowedMethods());

// app.use(async (ctx, next) => {
//     try {
//         await next();
//     } catch (err) {
//         ctx.status = err.status || 500;
//         ctx.body = err.message;
//         ctx.app.emit('error', err, ctx);
//     }
// });
app.use(async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    // will only respond with JSON
    ctx.status = err.statusCode || err.status || 500;
    ctx.body = {
      message: err.message,
    };
  }
});

app.on('error', (err, ctx) => {
  console.log(err);
  ctx.body = {
    status: false,
  };
  /* centralized error handling:
   *   console.log error
   *   write error to log file
   *   save error and request information to database if ctx.request match condition
   *   ...
   */
});

app.listen(config.port, () => {
  console.log(`App started at port ${config.port}`);
});
