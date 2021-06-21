'use strict';

var gulp = require('gulp'),
    babel = require('gulp-babel'),
    browserSync = require('browser-sync'),
    cleanCSS = require('gulp-clean-css'),
    prefixer = require('gulp-autoprefixer'),
    fileinclude = require('gulp-file-include'),
    rimraf = require('rimraf'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    strip = require('gulp-strip-comments'),
    uglify = require('gulp-uglify'),
    watch = require('gulp-watch'),
    merge = require('merge-stream'),
    concat = require('gulp-concat'),
    order = require('gulp-order');

function catchError (error) {
    console.log(error.toString());
    this.emit('end');
}

var folders = {
    src: 'src/',
    dst: './assets/'
}

var path = {
    build: {
        html: './',
        css: folders.dst + 'css/',
        js: folders.dst + 'js/',
        images: folders.dst + 'images/',
        fonts: folders.dst + 'fonts/'
    },
    src: {
        html: folders.src + 'html/pages/*.html',
        css: folders.src + 'styles/app.scss',
        js: {
            plugins: folders.src + 'js/plugins.js',
            components: folders.src + 'js/components.js'
        },
        images: folders.src + 'images/**/*.*',
        fonts: [
            folders.src + 'fonts/**/*.woff',
            folders.src + 'fonts/**/*.woff2',
            folders.src + 'fonts/**/*.ttf'
        ]
    },
    watch: {
        html: folders.src + 'html/**/*.html',
        css: folders.src + 'styles/**/*.*',
        js: folders.src + 'js/**/*.js',
        images: folders.src + 'images/**/*.*',
        fonts: [
            folders.src + 'fonts/**/*.woff',
            folders.src + 'fonts/**/*.woff2',
            folders.src + 'fonts/**/*.ttf'
        ]
    }
};

gulp.task('browser-sync', ['html:build', 'styles:build', 'js:build', 'images:build', 'fonts:build'], function() {

    var files = [
        folders.dst + '*.*'
    ];

    browserSync.init(files, {
        server: {
            baseDir: './'
        }
    });
});

gulp.task('html:build', function () {
    gulp.src(path.src.html) 
        .pipe(fileinclude({
            basepath: folders.src + 'html/',
            indent: true
        }))
        .on('error', catchError)
        .pipe(gulp.dest(path.build.html))
        .pipe(browserSync.reload({
            stream: true
        }));
});

gulp.task('styles:build', function () {
    gulp.src(path.src.css) 
        .pipe(sourcemaps.init())
        .pipe(sass({
            includePaths: [path.src.css],
            outputStyle: 'compressed',
            sourceMap: true,
            errLogToConsole: true
        }))
        .on('error', catchError)
        .pipe(prefixer())
        .pipe(cleanCSS({level: {1: {specialComments: 0}}}))
        .pipe(sourcemaps.write('/'))
        .pipe(gulp.dest(path.build.css))
        .pipe(browserSync.reload({
            stream: true
        }));
});

gulp.task('js:build', function () {

    var plugins = gulp.src(path.src.js.plugins) 
        .pipe(fileinclude({
            prefix: '//@@',
            basepath: folders.src + 'js/'
        }))
        .on('error', catchError);

    var components = gulp.src(path.src.js.components) 
        .pipe(fileinclude({
            prefix: '//@@',
            basepath: folders.src + 'js/'
        }))
        .on('error', catchError)
        .pipe(babel({
            presets: ['@babel/preset-env'],
            compact: false
        }))
        .on('error', catchError);
        
    merge(plugins, components)
        .pipe(order(['plugins.js', 'components.js']))
        .on('error', catchError)
        .pipe(sourcemaps.init())
        .on('error', catchError)
        .pipe(concat('app.js'))
        .on('error', catchError)
        .pipe(strip())
        .on('error', catchError)
        .pipe(sourcemaps.write('/'))
        .on('error', catchError)
        .pipe(gulp.dest(path.build.js))
        .on('error', catchError)
        .pipe(browserSync.reload({
            stream: true
        }))
        .on('error', catchError);
});

gulp.task('images:build', function() {
    gulp.src(path.src.images)
        .pipe(gulp.dest(path.build.images));
})

gulp.task('fonts:build', function() {
    gulp.src(path.src.fonts)
        .pipe(gulp.dest(path.build.fonts));
})

gulp.task('build', [
    'html:build',
    'styles:build',
    'js:build',
    'images:build',
    'fonts:build'
]);

gulp.task('watch', ['build', 'browser-sync'], function () {
    gulp.watch(path.watch.html, ['html:build']);
    gulp.watch(path.watch.css, ['styles:build']);
    gulp.watch(path.watch.js, ['js:build']);
    gulp.watch(path.watch.images, ['images:build']);
    gulp.watch(path.watch.fonts, ['fonts:build']);
});