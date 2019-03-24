const gulp = require('gulp');

/**
 * ```gulp loaded.task```
 *
 * An example of the auto loaded subdirectory ./tasks.
 * 
 * **Note**: *dot notation tasks must be escaped with quotes*
 * 
 * @method 
 * @name "loaded.task"
 * @memberof Examples
 */
gulp.task('loaded.task', () => {
  console.log('task loaded from subsirectory');
});