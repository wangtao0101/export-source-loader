import compiler from './compiler.js';

describe('loader test', () => {
  test('basic loader', async () => {
    const stats = await compiler('./fixtures/basic.js');
    expect(stats.toJson().modules[0].source).toEqual('const a = 1;\nexport default a;\nexport var source = `const a = 1;\nexport default a;`')
  });

  test('loader with babel-loader', async () => {
    const stats = await compiler('./fixtures/basic.js', { transformJS: true });
    expect(stats.toJson().modules[0].source).toEqual('"use strict";\n\nObject.defineProperty(exports, "__esModule", {\n  value: true\n});\nexports.source = exports.default = void 0;\nvar a = 1;\nvar _default = a;\nexports.default = _default;\nvar source = "const a = 1;\\nexport default a;";\nexports.source = source;')
  });

  test('loader with option module = commonjs', async () => {
    const stats = await compiler('./fixtures/basic.js', { loaderOptions: { module: 'commonjs' } });
    expect(stats.toJson().modules[0].source).toEqual('const a = 1;\nexport default a;\nmodule.exports.source = `const a = 1;\nexport default a;`')
  });

  test('loader with option name', async () => {
    const stats = await compiler('./fixtures/basic.js', { loaderOptions: { name: 'sourceCode' } });
    expect(stats.toJson().modules[0].source).toEqual('const a = 1;\nexport default a;\nexport var sourceCode = `const a = 1;\nexport default a;`')
  });

  test('loader with option module expect es and commonjs', async () => {
    const stats = await compiler('./fixtures/basic.js', { loaderOptions: { module: 'xxxx' } });
    expect(stats.toJson().modules[0].source).toEqual("throw new Error(\"Module build failed: ValidationError: export source loader Invalid Options\\n\\noptions.module should be equal to one of the allowed values\\n\");")
  });

  test('loader with option name minLength < 5', async () => {
    const stats = await compiler('./fixtures/basic.js', { loaderOptions: { name: 'sou' } });
    expect(stats.toJson().modules[0].source).toEqual("throw new Error(\"Module build failed: ValidationError: export source loader Invalid Options\\n\\noptions.name should NOT be shorter than 5 characters\\n\");")
  });
});
