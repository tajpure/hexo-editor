const gulp = require('gulp');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
const babel = require('gulp-babel');
const eslint = require('gulp-eslint');
const cleanCSS = require('gulp-clean-css');
const merge = require('merge-stream');
const hash = require('gulp-hash');

gulp.task('scripts', () => {
  return gulp.src([
    'node_modules/ace-builds/src/ace.js',
    'node_modules/material-design-lite/material.min.js',
    'node_modules/socket.io-client/socket.io.js',
    'node_modules/jquery/dist/jquery.min.js',
    'public/javascripts/*.js'
  ]).pipe(concat('app.js'))
    .pipe(uglify())
    .pipe(hash())
    .pipe(gulp.dest('public/dist'));
});

gulp.task('css', () => {
  return gulp.src([
    'node_modules/material-design-lite/material.min.css',
    'public/stylesheets/*.css'
  ]).pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(concat('style.css'))
    .pipe(hash())
    .pipe(gulp.dest('public/dist'));
});

gulp.task('lint', () => {
  return gulp.src('public/javascripts/*.js')
    .pipe(eslint({
        extends: 'eslint:recommended',
        ecmaFeatures: {
            'modules': true
        },
        rules: {
            'my-custom-rule': 1,
            'strict': 2
        },
        globals: {
            'jQuery': false,
            '$': true
        },
        envs: [
            'browser'
        ]
    }))
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});
