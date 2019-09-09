import { Context } from "koa";

export class CatsController {
    static async insertCat(ctx: Context) {
        const { name, age } = ctx.request.body;
        ctx.body = { name, age }
    }
}
