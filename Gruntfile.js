'use strict';

let path = require('path');
let fs = require('fs');

let timeStamp = generateTimeStamp();
let devStamp = 'temp';

function generateTimeStamp() {
  let date = new Date();
  let year = date.getFullYear().toString();
  let month = date.getMonth() + 1;
  let day = date.getDate();
  let hour = date.getHours();
  let minute = date.getMinutes();
  let second = date.getSeconds();

  let timeStamp = year.toString() +
    (month < 10 ? '0' : '') +
    month.toString() +
    (day < 10 ? '0' : '') +
    day.toString() +
    (hour < 10 ? '0' : '') +
    hour.toString() +
    (minute < 10 ? '0' : '') +
    minute.toString() +
    (second < 10 ? '0' : '') +
    second.toString();

  return timeStamp;
}

module.exports = function(grunt) {

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');

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
      deletePathsForPublic[i] = 'public/' + deletePathsForPublic[i] + '/';
    }
  }
  buildDeletePathsForPublic();

  // Project configuration.
  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    copy: {
      public: {
        expand: true,
        cwd: 'public/src/',
        src: ['**'],
        dest: 'public/' + timeStamp + '/'
      },
      devpublic: {
        expand: true,
        cwd: 'public/src/',
        src: ['**'],
        dest: 'public/' + devStamp + '/'
      }
    },

    clean: {
      public: deletePathsForPublic,
      timestamp: ['timestamp.txt'],
      version: ['version.txt']
    }

  });

  grunt.registerTask('gentimestamp', 'Generate a timestamp file', function(pathVal) {
    fs.writeFileSync('timestamp.txt', pathVal + '\n');
  });

  grunt.registerTask('genversion', 'Generate a version file', function() {
    let sourceVersion = process.env.SOURCE_VERSION;
    if (!sourceVersion) {
      sourceVersion = 'undefined';
    }
    fs.writeFileSync('version.txt', sourceVersion + '\n');
  });

  grunt.registerTask('create-build-dir', 'Create the build directory for Browserified files', function(pathVal) {

    // Ensure public/timestamp/build directory is created
    let buildDir = 'public/' + pathVal + '/build';
    if (!fs.existsSync(buildDir)){
      fs.mkdirSync(buildDir);
    }
  });

  grunt.registerTask('webServer', 'Run the web server', function() {
    let done = this.async();
    let childProcess = require('child_process');
    let webWorker = childProcess.spawn('node', ['webWorker.js']);
    webWorker.stdout.pipe(process.stdout);
    webWorker.stderr.pipe(process.stderr);

    // Never call done() as this task should be terminated with ctrl-c
  });

  grunt.registerTask('start-nginx', 'Start the Nginx proxy server', function() {
    let done = this.async();
    cleanCache();
    let childProcess = require('child_process');
    let nginxWorker = childProcess.spawn('nginx/bin/start-nginx');
    nginxWorker.stdout.pipe(process.stdout);
    nginxWorker.stderr.pipe(process.stderr);
    // Never call done() as this task should be terminated with ctrl-c
  });

  grunt.registerTask('stop-nginx', 'Stop the Nginx proxy server', function() {
    let done = this.async();
    let childProcess = require('child_process');
    let nginxWorker = childProcess.spawn('nginx/bin/stop-nginx');
    nginxWorker.stdout.pipe(process.stdout);
    nginxWorker.stderr.pipe(process.stderr);

    // Never call done() as this task should be terminated with ctrl-c
  });

  grunt.registerTask('web', ['webServer']);
  grunt.registerTask('build', [
    'clean',
    'gentimestamp:' + timeStamp,
    'genversion',
    'copy:public',
    'create-build-dir:' + timeStamp]);
  grunt.registerTask('devbuild', [
    'clean',
    'gentimestamp:' + devStamp,
    'genversion',
    'copy:devpublic',
    'create-build-dir:' + devStamp]);

  grunt.registerTask('default', function() {
    grunt.log.writeln('grunt commands this project supports:');
    grunt.log.writeln('');
    grunt.log.writeln('  grunt build (build for cache-busting with timestamp in public path)');
    grunt.log.writeln('  grunt devbuild (build with \"' + devStamp + '\" in public path)');
    grunt.log.writeln('  grunt clean (clean cache-busting static tree and timestamp.txt file)');
    grunt.log.writeln('  grunt web (start the web server - terminate with ctrl-c)');
    grunt.log.writeln('  grunt start-nginx (start the nginx proxy - terminate with ctrl-c)');
    grunt.log.writeln('  grunt stop-nginx (stop the nginx proxy - same as ctrl-c)');
  });
};

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
