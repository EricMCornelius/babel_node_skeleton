var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
var babel = require('gulp-babel');
var concat = require('gulp-concat');
var istanbul = require('gulp-istanbul');
var mocha = require('gulp-mocha');
var eslint = require('gulp-eslint');
var instrumenter = require('isparta').Instrumenter;

function build(cb) {
  return gulp.src('lib/**/*.js')
    .pipe(sourcemaps.init())
    .pipe(concat('app.js'))
    .pipe(babel())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('dist'));
};

function test(cb) {
  process.env.NODE_ENV = 'test';
  gulp.src(['lib/**/*.js'])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(istanbul({
      instrumenter: instrumenter,
      includeUntested: true,
      babel: {
        stage: 1
      }
    }))
    .pipe(istanbul.hookRequire())
    .on('finish', function() {
      gulp.src(['test/**/*.js'])
        .pipe(sourcemaps.init())
        .pipe(concat('test.js'))
        .pipe(babel())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('dist'))
        .on('finish', function() {
          gulp.src('dist/test.js')
            .pipe(mocha({reporter: 'good-mocha-html-reporter'}))
            .pipe(istanbul.writeReports())
            .on('end', cb);
        });
    });
};

gulp.task('test', test);
gulp.task('default', build);
