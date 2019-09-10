import Router from 'koa-router';
import { HelloWorldController } from './hello-world/hello-world.controller';
import { CatsController } from './cats/controller';

const router = new Router();

router.get('/', HelloWorldController.getHelloWorld);

router.post('/cats', CatsController.insertCat);

export default router;
