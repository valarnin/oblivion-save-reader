import path from 'path';
import { fileURLToPath } from 'url';

const dist = path.resolve(path.dirname(fileURLToPath(import.meta.url)), 'dist');

export default {
  entry: {
    a: {
      import: './save/savefile.ts',
      library: {type: 'umd', name: 'oblivionSaveFile'},
      filename: 'bundle.savefile.js',
    },
    b: {
      import: './save/record.ts',
      library: {type: 'umd', name: 'oblivionRecord'},
      filename: 'bundle.record.js',
    },
    c: {
      import: './esm/ESM.ts',
      library: {type: 'umd', name: 'oblivionESM'},
      filename: 'bundle.esm.js',
    },
  },
  output: {
    path: dist,
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.ts(x)?$/,
        loader: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: [
      '.tsx',
      '.ts',
      '.js'
    ]
  },
  devtool: 'source-map',
  target: 'web',
};
