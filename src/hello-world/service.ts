import { HelloWorldReponse } from "./models/hello-world-reponse";

export class HelloWorldService {
    static async getHello(): Promise<HelloWorldReponse> {
        return {
            msg: 'Hello, world!',
            status: true
        }
    }
}
