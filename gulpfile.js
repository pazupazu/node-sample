var gulp = require("gulp");
var plumber = require("gulp-plumber");

// web
var webserver  = require('gulp-webserver');
gulp.task('serve', function() {
    gulp.src('./')
        .pipe(plumber())
        .pipe(webserver({
            livereload: true,
            fallback: 'index.html',
            open: false
        }));
});

// css
var sass      = require('gulp-ruby-sass');
gulp.task('sass', function () {
    return sass('src/css/*.scss')
        .pipe(plumber())
        .pipe(gulp.dest('./assets/css/'));
});

// js
var browserify = require('browserify');
var watchify = require('watchify');
var babelify = require('babelify');
var uglify = require('gulp-uglify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');

function buildScript(file, watch) {
    var props = {
        entries: './src/js/' + file,
        extensions: ['.js'],
        debug: false,
        cache: {},
        packageCache: {},
    };
    var bundler = watch ? watchify(browserify(props)) : browserify(props);
    bundler.transform(babelify, {presets: ['es2015']});

    function rebundle() {
        return bundler
            .bundle()
            .on("error", function (err) {
                console.log("Error : " + err.message);
                this.emit("end");
            })
            .pipe(plumber())
            .pipe(source('./' + file))
            //.pipe(buffer())
            //.pipe(uglify())
            .pipe(gulp.dest('./assets/js/'));
    }
    bundler.on('update', function(i) {
        rebundle();
    });
    bundler.on('log', function(message) {
        console.log(message);
    });
    return rebundle();
}



// script run
gulp.task("watch", function() {
    //gulp.watch("./_assets/**/*.js", ['create']);
    gulp.watch('./src/css/*.scss', ['sass']);
    buildScript("default.js", true)
});

gulp.task('default', ['watch', 'serve']);
