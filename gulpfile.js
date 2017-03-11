const gulp = require('gulp')
const uglify = require('gulp-uglify')
const concat = require('gulp-concat')
const babel = require('gulp-babel')
const eslint = require('gulp-eslint')
const cleanCSS = require('gulp-clean-css')
const merge = require('merge-stream')
const rev = require('gulp-rev')
const replace = require('gulp-replace-task')
const clean = require('gulp-clean')
const fs = require('fs')
const rollup = require('gulp-rollup')
const sourcemaps = require('gulp-sourcemaps')
const stylus = require('gulp-stylus')
const gutil = require('gulp-util')

const paths = {
    scripts: ['public/javascripts/*.js'],
    sheets: ['public/stylesheets/*.styl'],
    dist: ['public/dist/*.js', 'public/dist/*.css']
}

gulp.task('clean', () => {
  return gulp.src('views/layout.pug', {read: false})
    .pipe(clean())
})

gulp.task('clean-js', () => {
  return gulp.src('public/dist/app*.js', {read: false})
    .pipe(clean())
})

gulp.task('clean-css', () => {
  return gulp.src('public/dist/style*.css', {read: false})
    .pipe(clean())
})

gulp.task('scripts', () => {
  return gulp.src([
    'public/javascripts/*.js'
  ]).pipe(uglify().on('error', gutil.log))
    .pipe(concat('app.js'))
    .pipe(rev())
    .pipe(gulp.dest('public/dist'))
    .pipe(rev.manifest('scripts.json'))
    .pipe(gulp.dest('public/dist'))
})

gulp.task('lib-scripts', () => {
  return gulp.src([
    'node_modules/ace-builds/src/ace.js',
    'node_modules/material-design-lite/material.min.js',
    'node_modules/jquery/dist/jquery.min.js',
    'node_modules/marked/marked.min.js',
    'node_modules/socket.io-client/dist/socket.io.js'
  ]).pipe(concat('libs.js'))
    .pipe(uglify())
    .pipe(rev())
    .pipe(gulp.dest('public/dist'))
    .pipe(rev.manifest('libs.json'))
    .pipe(gulp.dest('public/dist'))
})

gulp.task('sheets', () => {
  return gulp.src([
    'public/stylesheets/*.styl'
  ]).pipe(stylus({ compress: true }))
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(concat('style.css'))
    .pipe(rev())
    .pipe(gulp.dest('public/dist'))
    .pipe(rev.manifest('css.json'))
    .pipe(gulp.dest('public/dist'))
})

gulp.task('lib-sheets', () => {
  return gulp.src([
    'node_modules/material-design-lite/material.min.css',
    'node_modules/github-markdown-css/github-markdown.css'
  ]).pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(concat('libs.css'))
    .pipe(rev())
    .pipe(gulp.dest('public/dist'))
    .pipe(rev.manifest('libs-css.json'))
    .pipe(gulp.dest('public/dist'))
})

gulp.task('replace', () => {
  const cssJson = JSON.parse(fs.readFileSync('./public/dist/css.json', 'utf8'))
  const scriptsJson = JSON.parse(fs.readFileSync('./public/dist/scripts.json',
    'utf8'))
  const libsJson = JSON.parse(fs.readFileSync('./public/dist/libs.json',
    'utf8'))
  const libsCSS = JSON.parse(fs.readFileSync('./public/dist/libs-css.json',
    'utf8'))

  return gulp.src('views/origin-layout.pug')
    .pipe(concat('layout.pug'))
    .pipe(replace({
      patterns: [
        {
          match: 'style.css',
          replacement: cssJson['style.css']
        }
      ]
    }))
    .pipe(replace({
      patterns: [
        {
          match: 'libs.css',
          replacement: libsCSS['libs.css']
        }
      ]
    }))
    .pipe(replace({
      patterns: [
        {
          match: 'libs.js',
          replacement: libsJson['libs.js']
        }
      ]
    }))
    .pipe(replace({
      patterns: [
        {
          match: 'app.js',
          replacement: scriptsJson['app.js']
        }
      ]
    }))
    .pipe(gulp.dest('views'))
})

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
    .pipe(eslint.failAfterError())
})

gulp.task('watch', () => {
  gulp.watch(paths.scripts, ['scripts', 'clean-js', 'clean'])
  gulp.watch(paths.sheets, ['sheets', 'clean-css', 'clean'])
  gulp.watch(paths.dist, ['replace'])
})

gulp.task('default', ['clean', 'lib-scripts', 'lib-sheets', 'scripts', 'sheets', 'watch'])
