import gulp = require('gulp');
import typescript = require('gulp-typescript');
import stylus = require('gulp-stylus');
import nib = require('nib');
import open = require('gulp-open');
import server = require('gulp-express');
import webpack = require('gulp-webpack');
import del = require('del');

gulp.task('ts', () => {
  gulp.src('./src/index.ts')
    .pipe(webpack(require('./webpack.config.js'), require('webpack')))
    .pipe(gulp.dest('.'));

  gulp.src('./src/app.ts')
    .pipe(typescript())
    .pipe(gulp.dest('.'));
});

gulp.task('css', () => {
  gulp.src('src/*.styl')
    .pipe(stylus({
      use: [nib()],
      compress: false 
    }))
    .pipe(gulp.dest('./public/'))
});

gulp.task('srv', ()=> {
  server.run(['app.js']);
  
  gulp.src(__filename)
    .pipe(open({
      uri: 'http://localhost:3000'
    }));
});

gulp.task('clean', () => {
  del(['app.js', 'public/nicolayer.css', 'public/dist']);
});

gulp.task('default', () => {
  gulp.start(['srv']);
});
