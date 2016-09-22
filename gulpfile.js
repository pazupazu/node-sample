var gulp = require("gulp");
var plumber = require('gulp-plumber');
var sourcemaps = require('gulp-sourcemaps');
var rename = require('gulp-rename');
var chmod = require('gulp-chmod');

// パス設定（環境によって変更があるので）
var paths = {
    babel : "./assets/babel/",
    js : "./assets/js/",
    scss : "./assets/scss/",
    css : "./assets/css/",
    img : "./assets/img/",
}

// 通知送る場合はchannel を設定してください
var error = function(err) {
    console.log(err.message);
    /*
      var slack = require('gulp-slack');
      slack({
      url: 'https://hooks.slack.com/services/XXXXXXXXX/XXXXXXXXX/XXXXXXXXXXXXXXXXXXXXXXXX',
      user: 'gulp', // Optional
      icon_url: 'https://XXXXXXXXXXXXXXXXXXXXXXXX.png', // Optional
      //channel: '#alert', // Optional
      })(err.message);
      this.emit('end');
    */
}

// web
var webserver  = require('gulp-webserver');
gulp.task('server', function() {
    gulp.src('./')
    .pipe(plumber())
    .pipe(webserver({
        livereload: true,
        fallback: 'index.html',
        open: true
    }));
});

// CSS
var sass = require('gulp-sass');
var rsass      = require('gulp-ruby-sass');
var pleeease = require('gulp-pleeease');
var compass = require('gulp-compass');
var clean = require('gulp-clean-css');

gulp.task('scss', function () {
    return gulp.src(paths.scss + '*.scss')
        .pipe(plumber({errorHandler: error}))

        // nodesass の場合
        .pipe(sass())

        // pleeease の場合
        // .pipe(pleeease({sass: true}))
        // .pipe(rename({extname: '.css'}))

        // compass の場合(required ruby)
        // .pipe(compass({
        //     style    : 'expanded',
        //     logging  :false,
        //     comments : false,
        //     relative: true,
        //     sourcemap: false,
        //     css:   paths.css,
        //     sass:  paths.scss,
        //     image: paths.img
        // }))

        //.pipe(sourcemaps.init())
        .pipe(clean({compatibility: 'ie8'}))
        //.pipe(sourcemaps.write())
        .pipe(chmod(755))
        .pipe(gulp.dest(paths.css));
});

// JS
var babelify = require('babelify');
var watchify = require('gulp-watchify');
var streamify = require('gulp-streamify')
var uglify = require('gulp-uglify');

gulp.task('js', watchify(function(watchify) {
    return gulp.src(paths.babel + '*.js')
    .pipe(plumber({errorHandler: error}))
    //.pipe(sourcemaps.init())
    .pipe(watchify({
        watch: true,
        setup: function(bundle) {
            bundle.transform(babelify, {presets: "es2015"})
        }
    }))
    .pipe(streamify(uglify()))
    //.pipe(streamify(sourcemaps.write()))
    .pipe(chmod(755))
    .pipe(gulp.dest(paths.js))
}))

// COMMON
gulp.task('css', function(){
    gulp.watch(paths.scss + '*.scss', ['scss']);
});

gulp.task('default', ['js', 'css', 'server']);
