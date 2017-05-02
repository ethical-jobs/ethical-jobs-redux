const gulp = require('gulp');
const rollup = require('rollup');
const globby = require('globby');
const commonjs = require('rollup-plugin-commonjs');
const resolve = require('rollup-plugin-node-resolve');
const babel = require('rollup-plugin-babel');
const babelrc = require('babelrc-rollup').default;
const pkg = require('./package.json');

gulp.task('build', () => {

  const patterns = ['src/index.js','!src/**/__tests__/**/*'];

  globby(patterns).then(paths => paths.forEach(path => {
    return rollup.rollup({
      entry: path,
      plugins: [
        resolve(),
        commonjs({
          include: ['node_modules/**'],
        }),
        babel(babelrc()),
      ],
      external: Object.keys(pkg.dependencies),
    })
    .then(bundle => {
      bundle.write({
        dest: 'lib/es/index.js',
        format: 'es',
      });
      bundle.write({
        globals: {
          'immutable': 'Immutable',
          'redux-promise-middleware': 'promiseMiddleware',
          'reselect': 'reselect',
        },
        dest: 'lib/umd/index.js',
        format: 'umd',
        moduleName: 'ethical-jobs-redux',
      });
    });
  }));
});

gulp.task('build:watch', () => {
  gulp.watch('src/**/*.js', ['build']);
});
