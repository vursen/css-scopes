const compiler = require('./compiler');

test('zero config', async () => {
  const stats = await compiler('./fixtures/bundle.js');
  const output = stats.toJson().modules[1].source

  expect(output).toMatchSnapshot()
});

test('custom default scope path', async () => {
  const stats = await compiler('./fixtures/bundle.js', {
    defaultScopePath: './[name].html'
  });

  const output = stats.toJson().modules[1].source

  expect(output).toMatchSnapshot()
});
