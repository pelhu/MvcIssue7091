/// <binding BeforeBuild='copyLibs:js' />
/*
This file is the main entry point for defining Gulp tasks and using Gulp plugins.
Click here to learn more. https://go.microsoft.com/fwlink/?LinkId=518007
*/

/// <binding Clean='clean' />
"use strict";

var gulp = require("gulp")/*,
    rimraf = require("rimraf"),
    //concat = require("gulp-concat"),
    cssmin = require("gulp-cssmin"),
    uglify = require("gulp-uglify"),
    print = require('gulp-print'),
    rename = require('gulp-rename')*/;

gulp.task("copyLibs:js", function (cb) {
    gulp.src([
        './bower_lib/bootstrap-select/dist/css/bootstrap-select.css',
        './bower_lib/bootstrap-select/dist/css/bootstrap-select.min.css',
    ]).pipe(gulp.dest('./wwwroot/css'));
    gulp.src([
        './bower_lib/font-awesome/css/font-awesome.css',
        './bower_lib/font-awesome/css/font-awesome.min.css'
    ]).pipe(gulp.dest('./wwwroot/css/font-awesome/css'));
    gulp.src(['./bower_lib/font-awesome/fonts/*']).pipe(gulp.dest('./wwwroot/css/font-awesome/fonts'));
    gulp.src([
        './bower_lib/bootstrap/dist/css/bootstrap.css',
        './bower_lib/bootstrap/dist/css/bootstrap.min.css',
    ]).pipe(gulp.dest('./wwwroot/css/bootstrap/css'));
    gulp.src(['./bower_lib/bootstrap/fonts/*']).pipe(gulp.dest('./wwwroot/css/bootstrap/fonts'));
    gulp.src([
        './bower_lib/jquery/dist/jquery.js',
        './bower_lib/jquery/dist/jquery.min.js',
        './bower_lib/bootstrap/dist/js/bootstrap.js',
        './bower_lib/bootstrap/dist/js/bootstrap.min.js',
        './bower_lib/bootstrap-select/dist/js/bootstrap-select.js',
        './bower_lib/bootstrap-select/dist/js/bootstrap-select.min.js',
        './bower_lib/urijs/src/URI.js',
        './bower_lib/urijs/src/URI.min.js',
        './bower_lib/jquery-validation/dist/jquery.validate.js',
        './bower_lib/jquery-validation/dist/jquery.validate.min.js',
        './bower_lib/jquery-validation-unobtrusive/jquery.validate.unobtrusive.js',
        './bower_lib/jquery-validation-unobtrusive/jquery.validate.unobtrusive.min.js',
        './bower_lib/js-cookie/src/js.cookie.js',
        './bower_lib/js-cookie/src/js.cookie.min.js',
        './bower_lib/select2/dist/js/select2.js',
    ]).pipe(gulp.dest('./wwwroot/js'));
    gulp.src(['./bower_lib/moment/locale/tr.js']).pipe(gulp.dest('./wwwroot/js/moment/locale/'));
    gulp.src([
        './bower_lib/bootstrap-select/dist/js/i18n/defaults-tr_TR.js',
        './bower_lib/bootstrap-select/dist/js/i18n/defaults-tr_TR.min.js'
    ]).pipe(gulp.dest('./wwwroot/js/bootstrap-select/dist/js/i18n/'));
    gulp.src([
        './bower_lib/select2/dist/js/i18n/tr.js'
    ]).pipe(gulp.dest('./wwwroot/js/select2/dist/js/i18n/'));
});

//var paths = {
//    webroot: "./wwwroot/"
//};

//paths.js = paths.webroot + "js/**/*.js";
//paths.minJs = paths.webroot + "js/**/*.min.js";
//paths.css = paths.webroot + "css/**/*.css";
//paths.minCss = paths.webroot + "css/**/*.min.css";
//paths.concatJsDest = paths.webroot + "js/site.min.js";
//paths.concatCssDest = paths.webroot + "css/site.min.css";

//gulp.task("clean:js", function (cb) {
//    rimraf(paths.concatJsDest, cb);
//});

//gulp.task("clean:css", function (cb) {
//    rimraf(paths.concatCssDest, cb);
//});

//gulp.task("clean:js", function (cb) {
//    rimraf(paths.minJs, cb);
//});

//gulp.task("clean:css", function (cb) {
//    rimraf(paths.minCss, cb);
//});

//gulp.task("clean", ["clean:js", "clean:css"]);


//gulp.task("min:js", function () {
//    return gulp.src([paths.js, "!" + paths.minJs], { base: "." })
//        .pipe(uglify())
//        .pipe(gulp.dest("."));
//});

//gulp.task("min:css", function () {
//    return gulp.src([paths.css, "!" + paths.minCss])
//        .pipe(cssmin())
//        .pipe(rename({ suffix: '.min' }))
//        .pipe(gulp.dest(paths.webroot + "css"));
//});

//gulp.task("min", ["min:js", "min:css"]);