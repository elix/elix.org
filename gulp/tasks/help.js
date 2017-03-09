/*jslint node: true */
'use strict';

const gutil = require('gulp-util');

//
// Help task - prints to the console the tasks that are available to be run from the command line
//
function helpTask() {
  gutil.log(`gulp commands this project supports:

    gulp build (build for cache-busting with timestamp in public path)
    gulp devbuild (build with \"' + devStamp + '\" in public path)
    gulp buildelix (build node_modules/elix)
    gulp clean (clean cache-busting static tree and timestamp.txt file)
    gulp web (start the web server - terminate with ctrl-c)
    gulp start-nginx (start the nginx proxy - terminate with ctrl-c)
    gulp stop-nginx (stop the nginx proxy - same as ctrl-c)
  `);
}

module.exports = helpTask;
