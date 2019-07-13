const compiler = require('./compiler');

test('zero config css scope', async () => {
  const stats = await compiler('./fixtures/bundle.js');
  const output = stats.toJson().modules[0].source

  console.log(stats.toJson())

  expect(output).toMatchSnapshot()
});

test('zero config vue scope', async () => {
  const stats = await compiler('./fixtures/bundle.js');
  const output = stats.toJson().modules[2].source

  expect(output).toMatchSnapshot()
});

// test('custom default scope path', async () => {
//   const stats = await compiler('./fixtures/bundle.js', {
//     defaultScopePath: './[name].html'
//   });

//   const output = stats.toJson().modules[0].source

//   expect(output).toMatchSnapshot()
// });
