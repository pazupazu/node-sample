var gulp = require("gulp");
var plumber = require("gulp-plumber");
var notify = require('gulp-notify');
var error = notify.onError('<%= error.message %>');

// web
var webserver  = require('gulp-webserver');
gulp.task('serve', function() {
    gulp.src('./')
        .pipe(plumber({errorHandler: error}))
        .pipe(webserver({
            livereload: true,
            fallback: 'index.html',
            open: false
        }));
});

// css
var pleeease = require('gulp-pleeease');
var sass = require('gulp-ruby-sass');
gulp.task('css', function () {
    gulp.src('./src/css/*.scss')
        .pipe(plumber({errorHandler: error}))
        .pipe(pleeease({
            //scss: true,
            sass: true,
            autoprefixer:true,
            minifier: true,
            mqpacker: true,
        }))
        .pipe(gulp.dest('./assets/css/'));
});



gulp.task('sass', function () {
    return sass('./src/css/*.scss')
        .pipe(plumber({errorHandler: error}))
        .pipe(gulp.dest('./assets/css/'));
});

// js
var watchify = require('gulp-watchify');
var babelify = require('babelify');
var uglify = require('gulp-uglify');
var streamify = require('gulp-streamify')

gulp.task('js', watchify(function(watchify) {
    return gulp.src("./src/js/*.js")
        .pipe(plumber({errorHandler: error}))
        .pipe(watchify({
            watch: true,
            setup: function(bundle) {
                bundle.transform(babelify, {presets: ['es2015']})
            }
        }))
        .pipe(streamify(uglify()))
        .pipe(gulp.dest('./assets/js/'))
}))


// script run
gulp.task("watch", function() {
    gulp.watch('./src/css/*.scss', ['css']);
});

gulp.task('default', ['js', 'watch', 'serve']);
