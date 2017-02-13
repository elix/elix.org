/*jslint node: true */
'use strict';

const fs = require('fs');

//
// Start the local web server
//

function webserverTask() {
  //let done = this.async();
  let childProcess = require('child_process');
  let webWorker = childProcess.spawn('node', ['webWorker.js']);
  
  webWorker.stdout.pipe(process.stdout);
  webWorker.stderr.pipe(process.stderr);
}

module.exports = webserverTask;