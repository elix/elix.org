/*jslint node: true */
'use strict';

const fs = require('fs');
const path = require('path');
const del = require('del');

let deletePathsForPublic = [];

function getDirectories(srcpath) {
  return fs.readdirSync(srcpath).filter(function(file) {
    return fs.statSync(path.join(srcpath, file)).isDirectory();
  });
}

function buildDeletePathsForPublic() {
  let exceptionDir = 'src';
  
  // Get all the directories under public
  deletePathsForPublic = getDirectories('public');
  
  // Eliminate the public/src directory from the array. We don't want that deleted
  let index = deletePathsForPublic.indexOf(exceptionDir);
  deletePathsForPublic.splice(index, 1);
  
  // Update the array such that the relative paths are constructed against public/
  for (let i = 0; i < deletePathsForPublic.length; i++) {
    deletePathsForPublic[i] = 'public/' + deletePathsForPublic[i] + '/**';
  }
  
  deletePathsForPublic.push('timestamp.txt');
  deletePathsForPublic.push('version.txt');
}
buildDeletePathsForPublic();

//
// Clean task - clean cache-busting static tree and timestamp.txt file
//
function cleanTask() {
  return del(deletePathsForPublic);
}

module.exports = cleanTask;
