var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify-es').default;
var watch = require('gulp-watch');
var sourcemaps = require('gulp-sourcemaps');
var connect = require('gulp-connect');

var src = {
    js: 'src/js/**/*.js',
    sass: 'src/sass/**/*.scss',
    html: './*.html'
};

var dest = {
    js: 'dist/js/',
    bundlejs: 'app.min.js',
    css: 'dist/css/',
    maps: 'maps/'
};

gulp.task('server', function() {
    connect.server({
        livereload: true
    });
});

gulp.task('sass', function() {
    return gulp.src(src.sass)
        .pipe(sourcemaps.init())
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(sass({
            outputStyle: 'compressed'
        }).on('error', sass.logError))
        .pipe(sourcemaps.write(dest.maps))
        .pipe(gulp.dest(dest.css))
        .pipe(connect.reload());
});

gulp.task('js', function() {
    return gulp.src(src.js)
        .pipe(concat(dest.bundlejs))
        .pipe(uglify())
        .pipe(gulp.dest(dest.js))
        .pipe(connect.reload());
});

gulp.task('html', function() {
    gulp.src(src.html)
        .pipe(connect.reload());
});

gulp.task('watch', function() {
    gulp.watch(src.sass, ['sass']);
    gulp.watch(src.js, ['js']);
    gulp.watch(src.html, ['html']);
});

gulp.task('livereload', function() {
    gulp.src(['dist/css/*.css', 'dist/js/*.js'])
        .pipe(connect.reload());
});

gulp.task('default', ['sass', 'server', 'watch', 'livereload', 'js']);
