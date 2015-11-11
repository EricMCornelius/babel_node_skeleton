import {async_test} from '../../lib/test';

describe('testme', () => {
  it('should be stubbed out');

  it('should test async behavior', async () => {
    let result = await async_test();
    expect(result).to.equal(1);
  });
});
