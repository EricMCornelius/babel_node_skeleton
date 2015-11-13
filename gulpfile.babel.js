import fs from 'fs';
import gulp from 'gulp';
import sourcemaps from 'gulp-sourcemaps';
import babel from 'gulp-babel';
import concat from 'gulp-concat';
import istanbul from 'gulp-istanbul';
import mocha from 'gulp-mocha';
import eslint from 'gulp-eslint';
import rename from 'gulp-rename';
import browserify from 'browserify';

import {
  Instrumenter as instrumenter
}
from 'isparta';

let build = () => {
  return gulp.src('lib/**/*.js')
    .pipe(sourcemaps.init())
    .pipe(babel())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('dist'));
};

let bundle = () => {
  browserify('./dist/main.js', {standalone: 'bundle'})
    .bundle()
    .pipe(fs.createWriteStream('./dist/bundle.js'));
};

let test = cb => {
  process.env.NODE_ENV = 'test';
  gulp.src(['lib/**/*.js'])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(istanbul({
      instrumenter: instrumenter,
      includeUntested: true
    }))
    .pipe(istanbul.hookRequire())
    .on('finish', () => {
      gulp.src(['test/**/*.js'])
        .pipe(babel())
        .pipe(mocha({
          require: ['chai']
        }))
        .pipe(istanbul.writeReports())
    });
};

gulp.task('build', build);
gulp.task('test', test);
gulp.task('bundle', bundle);
