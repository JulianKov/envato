const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass');
const reload = browserSync.reload;

const src = {
  scss: 'app/sass/*.scss',
  css: 'app/css',
  html: 'app/*.html'
};

gulp.task('sass', gulp.series(() => {
  return gulp
    .src(src.scss)
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(src.css))
    .pipe(reload({ stream: true }));
}));

gulp.task('serve', gulp.series('sass', () => {
  browserSync.init({
    server: './app'
  });

  gulp.watch(src.scss, gulp.series('sass'));
  gulp.watch(src.html).on('change', reload);
}));
