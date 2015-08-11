import gulp from 'gulp'
const $ = require('gulp-load-plugins')()
const isparta = require('isparta') // doesn't work with import for some reason
import codecov from 'gulp-codecov.io'
import gulpJsdoc2md from 'gulp-jsdoc-to-markdown'
import {server as karma} from 'karma'
import del from 'del'
import path from 'path'

import manifest from './package.json'
const mainFile = manifest.main
const destinationFolder = path.dirname(mainFile)

gulp.task('clean', cb => {
  del([destinationFolder], cb)
})

gulp.task('clean:cov', cb => {
  del(['coverage'], cb)
})

// Build two versions of the library
gulp.task('build', ['clean'], () => {
  return gulp.src('src/**/*.js')
    .pipe($.plumber())
    .pipe($.sourcemaps.init({ loadMaps: true }))
    .pipe($.babel({
      stage: 0,
      modules: 'umd'
    }))
    .pipe(gulp.dest('lib'))
})

gulp.task('istanbul', cb => {
  gulp.src(['./src/**/*.js'])
    .pipe($.istanbul({
      instrumenter: isparta.Instrumenter,
      includeUntested: true,
      babel: { stage: 0 }
    }))
    .pipe($.istanbul.hookRequire()) // Force `require` to return covered files
    .on('finish', cb)
})

gulp.task('test', ['clean:cov', 'istanbul'], () => {
  return gulp.src('./test/**/*.js')
    .pipe($.mocha({
      reporter: 'spec'
    }))
    .pipe($.istanbul.writeReports({
      dir: './coverage',
      reportOpts: {dir: './coverage'},
      reporters: ['lcovonly']
    }))
})

gulp.task('karma', done => {
  karma.start({
    configFile: __dirname + '/karma.config.js',
    singleRun: true
  }, () => {
    done()
  })
})

gulp.task('coverage', () => {
  return gulp.src('./coverage/coverage.json')
    .pipe(codecov())
})

gulp.task('docs', () => {
  return gulp.src('./src/**/*.js')
    .pipe(gulpJsdoc2md())
    .pipe($.rename(path => {
      path.extname = '.md'
    }))
    .pipe(gulp.dest('docs'))
})

gulp.on('stop', () => {
  process.nextTick(() => {
    process.exit(0)
  })
})

gulp.task('default', ['test'])
