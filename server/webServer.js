//
// Elix.org web server
//
// The web server application consists of several pieces.
//
// 1. Nginx - We use Nginx as a reverse proxy server sitting in front of the Node web application. Its
// configuration file can be found at /config/nginx.conf.erb for production, and /nginx/config/nginx.conf.erb
// for development. Nginx is configured to serve static content requests, without having those requests forwarded
// to the Node application.
//
// 2. Express - The core of our routing and management of business logic is handled in our express.js code,
// which is instantiated in the expressServer.js module.
//
// Startup of the web server involves starting the Express server.
//

'use strict';

let logger = require('./logger/logger.js').logger('elixweb');
let expressServer = require('./expressServer.js');

let clientFolder;             // The location of the page files.
let testHookExpressStarted = null;

logger.info('***** Starting Elix.org web app *****');

module.exports = {

  get clientFolder() {
    return clientFolder;
  },
  set clientFolder(folder) {
    clientFolder = folder;
  },

  //
  // listen is the entry point for starting the express server.
  // The callback parameter is to be used by end-to-end test code
  // and is otherwise not invoked by the core app.
  //
  listen: function(expressStartedCB) {

    //
    // The listen method may be called from within our app, as
    // part of a connection retry. Do not overwrite the testHook callbacks
    // with null.
    //
    if (expressStartedCB) {
      testHookExpressStarted = expressStartedCB;
    }

    return expressServer.start(clientFolder, testHookExpressStarted);
  }
};