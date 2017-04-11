import commonjs from 'rollup-plugin-commonjs';
import resolve from "rollup-plugin-node-resolve";
import json from 'rollup-plugin-json';
import babel from 'rollup-plugin-babel';
import babelrc from 'babelrc-rollup';

let pkg = require('./package.json');
let external = Object.keys(pkg.peerDependencies);

export default {
  entry: 'src/index.js',
  plugins: [
    json(),
    resolve({
      jsnext: true,
      main: true,      
    }),
    commonjs({
      // include: 'node_modules/**',
    }),
    babel(babelrc()),    
  ],
  targets: [
    {
      dest: pkg.main,
      format: 'umd',
      moduleName: 'ethical-jobs-redux',
      sourceMap: true
    },
    {
      dest: pkg.module,
      format: 'es',
      sourceMap: true
    }
  ]
};