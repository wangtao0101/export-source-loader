import compiler from './compiler.js';

describe('basic test', () => {
  test('basic loader', async () => {
    const stats = await compiler('./fixtures/basic.js');
    expect(stats.toJson().modules[0].source).toMatchSnapshot();
  });

  test('loader with babel-loader', async () => {
    const stats = await compiler('./fixtures/basic.js', { transformJS: true });
    expect(stats.toJson().modules[0].source).toMatchSnapshot();
  });

  test('loader with option module = commonjs', async () => {
    const stats = await compiler('./fixtures/basic.js', { loaderOptions: { module: 'commonjs' } });
    expect(stats.toJson().modules[0].source).toMatchSnapshot();
  });

  test('loader with option name', async () => {
    const stats = await compiler('./fixtures/basic.js', { loaderOptions: { name: 'sourceCode' } });
    expect(stats.toJson().modules[0].source).toMatchSnapshot();
  });

  test('loader with option module expect es and commonjs', async () => {
    const stats = await compiler('./fixtures/basic.js', { loaderOptions: { module: 'xxxx' } });
    expect(stats.toJson().modules[0].source).toMatchSnapshot();
  });

  test('loader with option name minLength < 5', async () => {
    const stats = await compiler('./fixtures/basic.js', { loaderOptions: { name: 'sou' } });
    expect(stats.toJson().modules[0].source).toMatchSnapshot();
  });
});
