import compiler from './compiler.js';

describe('loader test', () => {
    test('basic loader test', async () => {
        const stats = await compiler('./fixtures/basic.js');
        expect(stats.toJson().modules[0].source).toEqual('const a = 1;\nexport default a;\nexport const source = `const a = 1;\nexport default a;`')
    });

    test('loader test with babel-loader', async () => {
        const stats = await compiler('./fixtures/basic.js', { transformJS: true });
        console.log(stats.toJson().modules[0]);
        expect(stats.toJson().modules[0].source).toEqual('"use strict";\n\nObject.defineProperty(exports, "__esModule", {\n  value: true\n});\nexports.source = exports.default = void 0;\nvar a = 1;\nvar _default = a;\nexports.default = _default;\nvar source = "const a = 1;\\nexport default a;";\nexports.source = source;')
    });
});