var gulp = require('gulp'),
    plumber = require('gulp-plumber'),
    uglify = require('gulp-uglify'),
    browserify = require('browserify'),
    babelify = require('babelify'),
    source = require('vinyl-source-stream'),
    sass = require('gulp-sass');


gulp.task('browserify', function(){
  browserify('./assets/app.js', {debug: true})
    .transform(babelify, {presets: ['es2015', 'react']})
    .bundle()
    .on("error", function(err){console.log("Error : " + err.message);})
    .pipe(source('build.js'))
    .pipe(gulp.dest('./build/'))
    .on('end', function(){
      gulp.src(['./build/build.js'])
        .pipe(plumber())
        .pipe(uglify({mangle: false}))
        .pipe(gulp.dest('./build/min'))
    })
});

gulp.task('sass', function(){
  gulp.src('./assets/**/*.scss')
    .pipe(plumber())
    .pipe(sass())
    .pipe(gulp.dest('./build/'));
});

gulp.task('watch', function(){
  gulp.watch('./assets/*.js', ['browserify']);
  gulp.watch('./assets/**/*.scss', ['sass']);
});

gulp.task('default', ['watch']);
