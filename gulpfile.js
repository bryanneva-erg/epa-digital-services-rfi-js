var gulp = require('gulp');
var jasmine = require('gulp-jasmine');

gulp.task('build', function() {
    console.log('Building...');
});

gulp.task('default', function() {
    console.log('Default gulp task');
    return gulp.src('spec/test.js')
        .pipe(jasmine());
});
