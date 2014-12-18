var gulp = require('gulp'),
	amTransportGulp = require('gulp-am-transport'),
	concat = require('gulp-concat'),
	rename = require('gulp-rename'),
	uglify = require('gulp-uglify');

gulp.task('build', function () {
	gulp.src('./src/**/*.js')
		.pipe(amTransportGulp({family:"AU"}))
		.pipe(concat('au.js'))
		.pipe(gulp.dest('./examples/lib'))
		.pipe(uglify())
		.pipe(gulp.dest('./dist/'));
});

gulp.task('doc', function () {
	gulp.src('./doc/*.md')
		.pipe(concat('au-doc.md'))
		.pipe(gulp.dest('./doc/build/'))
});

// The default task (called when you run `gulp` from cli)
gulp.task('default', ['build']);