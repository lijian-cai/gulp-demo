const gulp = require('gulp');
const htmlmin = require('gulp-htmlmin');
const cssmin = require('gulp-cssmin');
const less = require('gulp-less');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
// const fileinclude = require('gulp-file-include');

gulp.task('minify', () => {

    // 将需要处理的代码放到pipe里面
    return gulp.src('./src/*.html')
        // .pipe(fileinclude())
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(gulp.dest('dist'));
});

gulp.task('cssmin', () => {
    return gulp.src(['./src/css/*.less', './src/css/*.css'])
        .pipe(less())
        .pipe(cssmin())
        .pipe(gulp.dest('dist/css'));
})

gulp.task('jsmin', () => {
    return gulp.src('./src/js/*.js')
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'));

})

gulp.task('copy', () => {
    return gulp.src('./src/images/*')
        .pipe(gulp.dest('dist/images'));
})

// gulp 3.x: gulp.task('default', ['minify', 'cssmin', 'jsmin', 'copy'])
gulp.task('default', gulp.parallel('minify', 'cssmin', 'jsmin', 'copy'));