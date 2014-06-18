var gulp = require('gulp'),
	amTransportGulp = require('gulp-am-transport'),
	concat = require('gulp-concat');

gulp.task('am-transport', function () {
	gulp.src('./src/**/*.js')
		.pipe(amTransportGulp({uglify:true}))
		.pipe(concat('aj.js'))
		.pipe(gulp.dest('./dist/'));
});

// The default task (called when you run `gulp` from cli)
gulp.task('default', ['am-transport']);