/*
 *  Utilities for building out the version page
 */

'use strict';

let fs = require('fs');
let promisify = require('./promisify');
let readFileAsync = promisify(fs.readFile);

module.exports = {

  getVersionInfo() {
    let result = {};
    return readFileAsync('./timestamp.txt', 'utf-8')
    .then(timestampContents => {
      result.build = timestampContents ?
        timestampContents.trim() :
        'src';
      return readFileAsync('./version.txt', 'utf-8');
    })
    .then(versionContents => {
      result.version = versionContents ?
        versionContents.trim() :
        'no version file';
      return result;
    })
    .catch(error => {
      console.log(`getVersionInfo: ${error}`);
      console.log(`Make sure to run 'node buildVersion.js'`);
      return {};
    });
  }

};
