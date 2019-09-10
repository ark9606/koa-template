import { HelloWorldService } from "./service";

describe('Hello world service', () => {

  it('should return object', async () => {
    const res = await HelloWorldService.getHello();
    expect(res).toBeDefined();
    expect(typeof res.msg).toEqual('string');
  });

});
