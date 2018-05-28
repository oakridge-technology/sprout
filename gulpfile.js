var gulp = require('gulp');
var argv = require('yargs').argv;
var _ = require('lodash');
var yaml = require('js-yaml');
var fs = require('fs');
var moment = require('moment');
var Q = require('q');


gulp.task('run', function () {
	// gulp run --flag test
	var flag = argv.flag;

	console.log(flag); // should output "test"
});

gulp.task('yaml', function () {
	var file = yaml.safeLoad(fs.readFileSync('./test.yml', 'utf8'));
	console.log(file);
});

gulp.task('q', function () {
	var deferred = Q.defer();
	console.log(moment().unix(), 'script start timestamp');

	setTimeout(function () {
		var resolvedTs = moment().unix();
		deferred.resolve(resolvedTs);
	}, 300);

	deferred.promise.then(function (ts) {
		console.log(ts, 'resolved timestamp');
		console.log(moment().unix(), 'promise.then() timestamp')
	});
	// return deferred.promise;
});
