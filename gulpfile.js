var gulp = require('gulp');
var source = require('vinyl-source-stream');
var browserify = require('browserify');
var babelify = require('babelify');
var webserver = require('gulp-webserver');

function errorHandler(err) {
  console.log('Error: ' + err.message);
}

gulp.task('build', function() {
  browserify('index.js', {debug: true})
    .transform(babelify, {presets: ["es2015"]})
    .bundle()
    .on('error', errorHandler)
    .pipe(source('bundle.js'))
    .pipe(gulp.dest('build'));
});

gulp.task('watch', function() {
  gulp.watch('*.js', ['build']);
});

gulp.task('webserver', function() {
  gulp.src('./')
    .pipe(webserver({
      livereload: true,
      open: true
    }));
});

gulp.task('default', ['build', 'watch', 'webserver']);
