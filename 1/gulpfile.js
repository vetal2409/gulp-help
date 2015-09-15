'use strict';
var gulp = require('gulp'),
    concatCss = require('gulp-concat-css'),
    rename = require('gulp-rename'), //?
    minifyCss = require('gulp-minify-css'),
    notify = require("gulp-notify"),
    autoprefixer = require('gulp-autoprefixer'),
    //livereload = require('gulp-livereload'), //?
    connect = require('gulp-connect'),
    sass = require('gulp-sass'),
    //uncss = require('gulp-uncss'),
    plumber = require('gulp-plumber'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant');

//server connect
gulp.task('connect', function () {
    connect.server({
        root: 'app',
        livereload: true
    });
});

//css
gulp.task('css', function () {
    return gulp.src('scss/*.scss') // 'css/*.css'
        .pipe(plumber({
            errorHandler: function (err) {  //errorHandler  handleError
                console.log(err);
                this.emit('end');
            }
        }))
        .pipe(sass())
        .pipe(concatCss('all.css'))
        //.pipe(uncss({
        //    html: ['app/index.html']
        //}))
        .pipe(autoprefixer({
            browsers: ['last 5 versions'],
            cascade: false
        }))
        .pipe(minifyCss(''))
        .pipe(rename('all.min.css'))
        .pipe(gulp.dest('app/css'))
        .pipe(connect.reload());
});

////css
//gulp.task('css2', function () {
//    return gulp.src('css/**/*.css') // 'css/*.css'
//        .pipe(plumber())
//        .pipe(concatCss('all.css'))
//        //.pipe(uncss({
//        //    html: ['app/index.html']
//        //}))
//        .pipe(autoprefixer({
//            browsers: ['last 5 versions'],
//            cascade: false
//        }))
//        .pipe(minifyCss(''))
//        .pipe(rename('all.min.css'))
//        .pipe(gulp.dest('app/css'))
//        .pipe(connect.reload());
//});

gulp.task('img', function () {
    return gulp.src('img/*')
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        }))
        .pipe(gulp.dest('app/img'));
});

//html
gulp.task('html', function () {
    return gulp.src('app/index.html')
        .pipe(connect.reload());
});

gulp.task('js', function () {
    return gulp.src('js/**/*.js')
        .pipe(plumber({
            errorHandler: function (err) {  //errorHandler  handleError
                console.log(err);
                this.emit('end');
            }
        }))
        .pipe(concat('all.js'))
        .pipe(uglify())
        .pipe(rename('all.min.js'))
        .pipe(gulp.dest('app/js'));
});

//watch
gulp.task('watch', function () {
    gulp.watch('scss/*.scss', ['css']); // 'css/*.css'
    //gulp.watch('css/**/*.css', ['css2']); // 'css/*.css'
    gulp.watch('app/index.html', ['html']);
});

//default
gulp.task('default', ['connect', 'html', 'css', 'watch']);