/*jslint node: true */
'use strict';

const fs = require('fs');
const path = require('path');

// Clean the Nginx cache.
function cleanCache() {
  let cacheFolder = path.join(__dirname, 'nginx/cache');
  let cachedFiles = [];
  try {
    if (!fs.existsSync(cacheFolder)) {
      cachedFiles = fs.readdirSync(cacheFolder);
    }
  }
  catch(e) {
    // If cache folder doesn't exist, ignore that
    if (e.code !== 'ENOENT') {
      throw e;
    }
  }

  cachedFiles.map((cachedFile) => fs.unlinkSync(path.join(cacheFolder, cachedFile)));
}


//
// Start the local nginx proxy server
//

function startnginxTask() {
  cleanCache();
  let childProcess = require('child_process');
  let nginxWorker = childProcess.spawn('nginx/bin/start-nginx');
  nginxWorker.stdout.pipe(process.stdout);
  nginxWorker.stderr.pipe(process.stderr);
}

function stopnginxTask() {
  let childProcess = require('child_process');
  let nginxWorker = childProcess.spawn('nginx/bin/stop-nginx');
  nginxWorker.stdout.pipe(process.stdout);
  nginxWorker.stderr.pipe(process.stderr);
}

module.exports = {
  startnginxTask: startnginxTask,
  stopnginxTask: stopnginxTask
};