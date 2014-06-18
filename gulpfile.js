var gulp = require('gulp'),
	amTransportGulp = require('gulp-am-transport'),
	concat = require('gulp-concat'),
	rename = require('gulp-rename'),
	uglify = require('gulp-uglify');

gulp.task('am-transport', function () {
	gulp.src('./src/**/*.js')
		.pipe(amTransportGulp())
		.pipe(concat('aj.js'))
		.pipe(gulp.dest('./dist/'))
		.pipe(uglify())
		.pipe(rename({ suffix: '.min' }))
		.pipe(gulp.dest('./dist/'));
});


// The default task (called when you run `gulp` from cli)
gulp.task('default', ['am-transport']);