var gulp = require('gulp');
var argv = require('yargs').argv;
var _ = require('lodash');

gulp.task('run', function () {
	// gulp run --flag test
	var flag = argv.flag;

	console.log(flag); // should output "test"
});
