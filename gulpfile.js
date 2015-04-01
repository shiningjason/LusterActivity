var gulp = require('gulp');
var browserify = require('gulp-browserify');
var browserSync = require('browser-sync');
var concat = require('gulp-concat');
var reload = browserSync.reload;

gulp.task('browserify', function() {
  gulp.src('src/js/main.js')
    .pipe(browserify({
      transform: 'reactify'
    }))
    .pipe(concat('main.js'))
    .pipe(gulp.dest('dist/js'));
});

gulp.task('copy', function() {
  gulp.src('src/index.html')
    .pipe(gulp.dest('dist'));
});

gulp.task('default', ['browserify', 'copy']);

gulp.task('serve', ['default'], function() {
  browserSync({
    server: ['dist']
  });

  gulp.watch('src/**/*.*', ['default', reload]);
});
