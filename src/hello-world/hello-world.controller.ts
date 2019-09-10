import { Context } from 'koa';
import { HelloWorldService } from './service';

export class HelloWorldController {
  static async getHelloWorld(ctx: Context): Promise<void> {
    ctx.body = await HelloWorldService.getHello();
  }
}
