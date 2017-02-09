/*jslint node: true */
'use strict';

const fs = require('fs');

//
// Generate a version.txt file
//

function genversionTask() {
  let sourceVersion = process.env.SOURCE_VERSION;
  if (!sourceVersion) {
    sourceVersion = 'undefined';
  }
    
  return fs.writeFile('version.txt', sourceVersion + '\n');
}

module.exports = genversionTask;