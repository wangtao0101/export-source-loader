import { getOptions } from 'loader-utils';
import validateOptions from 'schema-utils';

const schema = {
  type: 'object',
  properties: {
    module: {
      enum: ['es', 'commonjs']
    },
    name: {
      type: 'string',
      minLength: 5
    },
  }
}

export default function loader(source) {
  const options = getOptions(this) || {};

  validateOptions(schema, options, 'export source loader');

  const escapedSource = source.replace('`', '\\`')

  const name = options.name || 'source';
  if (options.module === 'commonjs') {
    return `${source}\nmodule.exports.${name} = \`${escapedSource}\``;
  }

  return `${source}\nexport var ${name} = \`${escapedSource}\``;
};
