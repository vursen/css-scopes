const compiler = require('./compiler');

test('zero config', async () => {
  const stats = await compiler('./fixtures/bundle.js');
  const output = stats.toJson().modules[1].source

  expect(output).toMatchSnapshot()
});

test('default scope path', async () => {
  const stats = await compiler('./fixtures/bundle.js', {
    defaultScopePath: './[name].html'
  });

  const output = stats.toJson().modules[1].source

  expect(output).toMatchSnapshot()
});

test('using class as scope selector', async () => {
  const stats = await compiler('./fixtures/bundle.js', {
    getScopeSelector(path) {
      return `.s-${path.replace(/\/|\./g, '-')}`;
    }
  });

  const output = stats.toJson().modules[1].source

  expect(output).toMatchSnapshot()
});
