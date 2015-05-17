var include = require('lib/include');

describe('basic', function() {
  it('should test destructuring', () => {
    let [x, y] = [1, 2];
    expect(x).to.equal(1);
    expect(y).to.equal(2);

    include.destructure();
    include.destructure({first: 2});
    include.destructure({second: 1});
  });

  it('should test async execution', (cb) => {
    include.exec().then(res => cb());
  });
});
