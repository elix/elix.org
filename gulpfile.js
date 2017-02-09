/*jslint node: true */
'use strict';

const gulp = require('gulp');

const helpTask = require('./gulp/tasks/help');
const cleanTask = require('./gulp/tasks/clean');
const copysrcToTimestampTask = require('./gulp/tasks/copysrc').copysrcToTimestampTask;
const copysrcToDevstampTask = require('./gulp/tasks/copysrc').copysrcToDevstampTask;
const gentimestampTask = require('./gulp/tasks/gentimestamp').gentimestampTask;
const gendevstampTask = require('./gulp/tasks/gentimestamp').gendevstampTask;
const genversionTask = require('./gulp/tasks/genversion');
const startnginxTask = require('./gulp/tasks/nginx').startnginxTask;
const stopnginxTask = require('./gulp/tasks/nginx').stopnginxTask;
const webserverTask = require('./gulp/tasks/webserver');

//
// Naming convention for tasks:
// taskName[-taskDependency[-taskDependency-[...]]]
//
// Example:
// genversion: Simply runs the genversion task
// genversion-gentimestamp-clean: Runs the genversion task with a dependency
//    first on gentimestamp, then on clean
//

// Private
gulp.task('copysrctimestamp', [], copysrcToTimestampTask);
gulp.task('copysrcdevstamp', [], copysrcToDevstampTask);
gulp.task('gentimestamp', [], gentimestampTask);
gulp.task('gendevstamp', [], gendevstampTask);
gulp.task('genversion', [], genversionTask);
gulp.task('help', [], helpTask);
gulp.task('clean', [], cleanTask);
gulp.task('genversion-gentimestamp-clean', ['gentimestamp-clean'], genversionTask);
gulp.task('genversion-gendevstamp-clean', ['gendevstamp-clean'], genversionTask);
gulp.task('gentimestamp-clean', ['clean'], gentimestampTask);
gulp.task('gendevstamp-clean', ['clean'], gendevstampTask);
gulp.task('copysrctimestamp-genversion-gentimestamp-clean', ['genversion-gentimestamp-clean'], copysrcToTimestampTask);
gulp.task('copysrcdevstamp-genversion-gendevstamp-clean', ['genversion-gendevstamp-clean'], copysrcToDevstampTask);

// Public
gulp.task('default', ['help']);
gulp.task('build', ['copysrctimestamp-genversion-gentimestamp-clean']);
gulp.task('devbuild', ['copysrcdevstamp-genversion-gendevstamp-clean']);
gulp.task('web', [], webserverTask);
gulp.task('start-nginx', [], startnginxTask);
gulp.task('stop-nginx', [], stopnginxTask);