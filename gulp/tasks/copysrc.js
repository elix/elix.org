/*jslint node: true */
'use strict';

const gulp = require('gulp');
const timeStamp = require('./gentimestamp').timeStamp;
const devStamp = require('./gentimestamp').devStamp;

//
// Copy the public/src tree
//

function copysrcHelperTask(dest) {
  dest = './public/' + dest;
  return gulp.src('./public/src/**')
  .pipe(gulp.dest(dest));
}

function copysrcToTimestampTask() {
  return copysrcHelperTask(timeStamp);
}

function copysrcToDevstampTask() {
  return copysrcHelperTask(devStamp);
}

module.exports = {
  copysrcToTimestampTask: copysrcToTimestampTask,
  copysrcToDevstampTask: copysrcToDevstampTask
};