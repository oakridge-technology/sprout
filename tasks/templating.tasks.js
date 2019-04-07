const gulp = require('gulp');
const jsdoc = require('gulp-jsdoc3');
const argv = require('yargs').argv;
const _ = require('lodash');
const yaml = require('js-yaml');
const fs = require('fs');
const moment = require('moment');
const random = require("randomstring");

const CONFIG_YAML_FILE = './config.yml';
const ENV_FILE = './.env';

/**
 * @class Template
 * @classdesc Utilities for creating new admin Dream Factory compose files
 */

/**
 * ```gulp template.new --host "value"```
 *
 * Generate the base YAML "env.yml" template. gulp template.env will create the docker compose .env file
 * based on env.yml.
 * 
 * @method run
 * @name "template.new"
 * @memberOf Template
 * @param {string} [--database, -d] database name, required
 * @param {string} [--server, -s=localhost] host name like "db.url.com"
 * @param {string} [--root, -r=root] root user name
 * @param {string} [--port, -p=3306] port number for mysql
 * @param {string} [--pass=random] 
 * @param {string} [--user, -u=random] user
 */
gulp.task('template.new', () => {
  let params = {
    // required
    database: argv.database || argv.d,

    // preset
    host: argv.server || argv.s || 'localhost',
    root: argv.root || argv.r || 'root',
    port: argv.port || argv.p || 3306,
    password: argv.pass|| random.generate(12),
    user: argv.user || argv.u || random.generate({ length: 12, charset: 'alphabetic' }),
  };

  let template = _.template(fs.readFileSync('./config.template', 'utf8'));
  let newConfig = template(params);
  let configExists = fs.existsSync(CONFIG_YAML_FILE);
  if (configExists) {
    let currentConfig = fs.readFileSync(CONFIG_YAML_FILE, 'utf8');
    let oldEnv = yaml.safeLoad(currentConfig);
    fs.writeFileSync('./' + moment().unix() + '-config.json', JSON.stringify(oldEnv, null, 2));
  }
  fs.writeFileSync(CONFIG_YAML_FILE, newConfig);
});

gulp.task('template.env', () => {
  let config = yaml.safeLoad(fs.readFileSync(CONFIG_YAML_FILE, 'utf8'));
  let template = _.template(fs.readFileSync('./env.template', 'utf8'));
  let newEnv = template(config);ENV_FILE
  fs.writeFileSync(ENV_FILE, newEnv);
});