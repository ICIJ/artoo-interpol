var gulp = require('gulp'),
	uglify = require('gulp-uglify'),
	rename = require('gulp-rename'),
	artoo = require('gulp-artoo');
 
gulp.task('default', function() {
	return gulp.src('./bookmark.js')
		.pipe(uglify())
		.pipe(rename('artoo-interpol-wanted.bookmark.js'))
		.pipe(artoo())
		.pipe(gulp.dest('./build'));
});
