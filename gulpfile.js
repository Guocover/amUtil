var gulp = require('gulp'),
	amTransportGulp = require('gulp-am-transport'),
	concat = require('gulp-concat'),
	rename = require('gulp-rename'),
	uglify = require('gulp-uglify');

gulp.task('build', function () {
	gulp.src('./src/**/*.js')
		.pipe(amTransportGulp())
		.pipe(concat('aj.js'))
		.pipe(gulp.dest('./dist/'))
		.pipe(uglify())
		.pipe(rename({ suffix: '.min' }))
		.pipe(gulp.dest('./dist/'));
});

gulp.task('doc', function () {
	gulp.src('./doc/*.md')
		.pipe(concat('aj-doc.md'))
		.pipe(gulp.dest('./doc/build/'))
});

// The default task (called when you run `gulp` from cli)
gulp.task('default', ['build']);