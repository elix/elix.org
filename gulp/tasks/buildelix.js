/*jslint node: true */
'use strict';

const gutil = require('gulp-util');
const spawn = require('child_process').spawn;

//
// buildelix task - builds Elix under the node_modules/elix folder
//
function buildElixTask(done) {
  let cmd = spawn(
    'gulp', 
    ['--gulpfile', 'node_modules/elix/gulpfile.js', 'build'], 
    {stdio: 'inherit'});
    
  cmd.on('close', function(code) {
    gutil.log(`Elix build exited with code ${code}`);
    done();
  });
}

module.exports = buildElixTask;