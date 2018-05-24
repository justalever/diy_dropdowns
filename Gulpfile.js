'use strict';

const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const imagemin = require('gulp-imagemin');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const watch = require('gulp-watch');
const sourcemaps = require('gulp-sourcemaps');
const connect = require('gulp-connect');
const imgSrc = 'assets/images/originals/*';
const imgDest = 'assets/images/';
const jsOutput = 'assets/js/dist/';
const jsInput = { js: 'assets/js/dev/**/*.js' }

gulp.task('server', function() {
  connect.server({
    livereload: true
  });
});

gulp.task('sass', function() {
  return gulp.src('assets/sass/**/*.scss')
    .pipe(sourcemaps.init())
        .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(sass({
      outputStyle: 'compressed'
    }).on('error', sass.logError))
    .pipe(sourcemaps.write('./maps'))
    .pipe(gulp.dest('./'))
    .pipe(connect.reload());
});

gulp.task('js', function() {
  return gulp.src(jsInput.js)
    .pipe(concat('app.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./assets/js/dist/'))
    .pipe(connect.reload());
});

gulp.task('html', function() {
  gulp.src('./*.html')
    .pipe(connect.reload());
});

gulp.task('livereload', function() {
  gulp.src(['./style.css', 'assets/js/dist/*.js'])
    .pipe(connect.reload());
});

gulp.task('watch', function() {
  gulp.watch('assets/sass/**/*.scss', ['sass']);
  gulp.watch('assets/js/**/*.js', ['js']);
  gulp.watch('./*.html', ['html']);
});

gulp.task('default', ['sass', 'server', 'watch', 'livereload', 'js']);
