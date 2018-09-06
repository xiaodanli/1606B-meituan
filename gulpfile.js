var gulp = require('gulp');

var server = require('gulp-webserver');

var fs = require('fs');

var path = require('path');

var url = require('url');

var sass = require('gulp-sass');

var minCss = require('gulp-clean-css');

var uglify = require('gulp-uglify');

function serverFun(serverUrl) {
    return gulp.src(serverUrl)
        .pipe(server({
            port: 9090,
            middleware: function(req, res, next) {
                var pathname = url.parse(req.url).pathname;

                if (pathname === '/favicon.ico') {
                    res.end('');

                    return
                }

                if (pathname === '/api/swiper') {

                } else {
                    pathname = pathname === '/' ? '/index.html' : pathname;
                    res.end(fs.readFileSync(path.join(__dirname, serverUrl, pathname)))
                }
            }
        }))
}

//开发环境 --- 起服务
gulp.task('devServer', function() {
    return serverFun('src')
})

//开发环境 --- css

gulp.task('devCss', function() {
    return gulp.src('./src/sass/*.scss')
        .pipe(sass())
        .pipe(minCss())
        .pipe(gulp.dest('./src/css'))
})


//监听

gulp.task('watch', function() {
    return gulp.watch('./src/sass/*.scss', gulp.series('devCss'))
})

//开发环境

gulp.task('dev', gulp.series('devCss', 'devServer', 'watch'))


//线上环境
gulp.task('buildJs', function() {
    return gulp.src(['./src/js/**/*.js', '!./src/js/libs/*.js'])
        .pipe(uglify())
        .pipe(gulp.dest('build/js'))
})

gulp.task('buildCss', function() {
    return gulp.src('./src/sass/*.scss')
        .pipe(sass())
        .pipe(minCss())
        .pipe(gulp.dest('./build/css'))
})

gulp.task('copyLibs', function() {
    return gulp.src('./src/js/libs/*.js')
        .pipe(gulp.dest('build/js/libs'))
})

gulp.task('copyHtml', function() {
    return gulp.src('./src/**/*.html')
        .pipe(gulp.dest('build'))
})

//线上的服务
gulp.task('buildServer', function() {
    return serverFun('build')
})

//线上环境
gulp.task('build', gulp.series('buildJs', 'buildCss', 'copyLibs', 'copyHtml'))