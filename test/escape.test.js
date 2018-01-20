import compiler from './compiler.js';

describe('escape test', () => {
  test('escape loader', async () => {
    const stats = await compiler('./fixtures/escape.js');
    expect(stats.toJson().modules[0].source).toMatchSnapshot();
  });
});
