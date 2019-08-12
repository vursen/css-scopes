const compiler = require('./compiler');

test('zero config', async () => {
  const stats = await compiler('./fixtures/bundle.js');
  const output = stats.toJson().modules[1].source

  expect(output).toMatchSnapshot()
});

test('custom extensions', async () => {
  const stats = await compiler('./fixtures/bundle.js', {
    extensions: ['.slim']
  });

  const output = stats.toJson().modules[1].source

  expect(output).toMatchSnapshot()
});

test('default scope path', async () => {
  const stats = await compiler('./fixtures/bundle.js', {
    defaultScopePath(sourceName, _sourcePath) {
      return `./${sourceName}.js`
    }
  });

  const output = stats.toJson().modules[1].source

  expect(output).toMatchSnapshot()
});

test('using class as scope selector', async () => {
  const stats = await compiler('./fixtures/bundle.js', {
    scopeSelector(scopePath) {
      return `.s-${scopePath.replace(/\/|\./g, '-')}`;
    }
  });

  const output = stats.toJson().modules[1].source

  expect(output).toMatchSnapshot()
});
