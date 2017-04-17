/*jslint node: true */
'use strict';

const spawn = require('child_process').spawn;

//
// Builds Elix under the node_modules/elix folder
//
function buildElix() {
  let cmd = spawn(
    'node_modules/.bin/gulp', 
    ['build'], 
    {cwd: 'node_modules/elix', stdio: 'inherit'});
    
  cmd.on('close', function(code) {
    console.log(`Elix build exited with code ${code}`);
  });
}

buildElix();