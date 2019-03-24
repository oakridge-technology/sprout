const gulp = require('gulp');
const jsdoc = require('gulp-jsdoc3');
const argv = require('yargs').argv;
const _ = require('lodash');
const yaml = require('js-yaml');
const fs = require('fs');
const moment = require('moment');

/**
 * @namespace
 */

/**
 * @class Examples
 * @classdesc Example Gulp Tasks
 */

// load sub directory "tasks"
const tasksDirectory = './tasks';
let tasks = fs.readdirSync(tasksDirectory);
tasks.forEach((task, index) => {
	require(tasksDirectory + '/' + task);
});

/**
 * ```gulp run --arg "value"```
 * 
 * @method run
 * @memberOf Examples
 * @param {string} [--arg, -a=defaultValue] output to console log
 */
gulp.task('run', () => {
	let flag = argv.arg || argv.a || 'defaultValue';

	console.log(flag);
});

/**
 * ```gulp yaml --file test.yml```
 * 
 * An example of loading a yaml file for other uses.
 * 
 * @method yaml
 * @memberOf Examples
 * @param {string} [--file, -f=test.yml] YAML file output to console
 */
gulp.task('yaml', () => {
	let file = argv.file || argv.f || 'test.yml';
	let json = yaml.safeLoad(fs.readFileSync('./' + file, 'utf8'));

	console.log(_.keys(json));
	console.log(JSON.stringify(json, null, 2));
});

/**
 * ```gulp promise --seconds 2```
 * 
 * An example async task, which will wait --seconds before printing timestamps
 * 
 * @method promise
 * @async
 * @memberOf Examples
 * @param {string} [--seconds, -s=test.yml] YAML file output to console
 */
gulp.task('promise', (done) => {
	let seconds = argv.seconds || argv.s || 2;
	let tsStart = moment().unix();

	console.log(tsStart, 'start timestamp');

	let promise = new Promise((resolve, reject) => {
		setTimeout(() => {
			var tsFinished = moment().unix();
			resolve(tsFinished);
		}, seconds*1000);
	});

	promise
		.then((ts) => {
			console.log(ts, 'resolved timestamp');
			console.log(moment().unix(), 'promise.then() timestamp');
			done();
		});
});

/**
 * ```gulp doc --config jsdoc.json```
 * 
 * The default doc command, this will scan ./README.md, ./gulpfile.js, and ./tasks/*.js files.
 * 
 * @method doc
 * @class Docs
 * @classdesc Generate jsDocs
 * @param {string} [--config, -c=jsdoc.json] generates jsDocs
 */
gulp.task('doc', (done) => {
	let config = argv.config || argv.c || 'jsdoc.json';
	let file = require('./' + config);
  gulp.src([
  	'README.md',
  	'gulpfile.js',
  	'./tasks/**/*.js'
  ], { read: false })
      .pipe(jsdoc(file, done));
});
