var gulp = require('gulp');
var elm  = require('gulp-elm');
var plumber = require('gulp-plumber');

// File paths
var paths = {
  dest: 'dist',
  elm: 'src/*.elm',
  static: 'src/*.{html,css,png,ico}'
};

// Make elm into js
gulp.task('elmCompile', function(){
  return gulp.src(paths.elm, { optimize: true })
    .pipe(elm())
    .pipe(gulp.dest('dist/'));
});

// Move static assets to dist
gulp.task('staticCompile',
    gulp.series( function() {
    return gulp.src(paths.static)
        .pipe(plumber())
        .pipe(gulp.dest(paths.dest));
}));

gulp.task('elm-bundle', function(){
  return gulp.src('src/**/Main.elm', { optimize: true })
    .pipe(elm.bundle('bundle.js'))
    .pipe(gulp.dest('dist/'));
});



gulp.task('build',
    gulp.series('elmCompile', 'staticCompile'))
gulp.task('pack',
    gulp.series('elm-bundle', 'staticCompile'))
