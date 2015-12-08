var gulp       = require('gulp');
var sass       = require('gulp-sass');
var source     = require('vinyl-source-stream');
var buffer     = require('vinyl-buffer');
var browserify = require('browserify');
var babel      = require('babelify');
var sourcemaps = require('gulp-sourcemaps');
var watchify   = require('watchify');
var jasmine    = require('gulp-jasmine');

// Compile Our Sass
gulp.task('sass', function() {
    return gulp.src('assets/scss/base.scss')
    	.pipe(sass())
        .pipe(gulp.dest('public/assets/css'));
});

gulp.task('watch-sass', function() {
	return gulp.watch('assets/scss/*.scss', ['sass']);
});

function compile(watch) {
	var bundler = watchify(browserify('./assets/js/app.js', { debug: true }).transform(babel));

	function rebundle() {
		bundler.bundle()
			.on('error', function(err) { console.error(err); this.emit('end'); })
			.pipe(source('build.js'))
			.pipe(buffer())
			.pipe(sourcemaps.init({ loadMaps: true }))
			.pipe(sourcemaps.write('./'))
			.pipe(gulp.dest('./public/assets/js/'));
	}

	if (watch) {
		bundler.on('update', function() {
			console.log('-> bundling...');
			rebundle();
		});
	}

	rebundle();
}

function watch() {
	return compile(true);
};

gulp.task('test', function() {
	return gulp.src('spec/test.js')
		.pipe(jasmine());
});

gulp.task('build', function() { return compile(); });
gulp.task('watch', function() { return watch(); });

gulp.task('default', ['test','watch','watch-sass']);
