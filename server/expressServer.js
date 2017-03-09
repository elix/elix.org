//
// Node/Express server implementation
//

'use strict';

let fs = require('fs');
let path = require('path');
let express = require('express');
let compression = require('compression');
let version = require('./version.js');
let routes = require('./routes.js');
let logger = require('./logger/logger.js').logger('elixweb');

// Log all requests
function logRequest(req, res, next) {
  logger.info({req: req}, 'REQUEST');
  next();
}


module.exports = {

  start: function(clientFolder, testHookExpressStarted) {
    logger.info('Starting the Express server');

    let app = express();
    let server = require('http').createServer(app);

    app.use(compression());
    app.use(logRequest);

    //
    // Set secure cookie for production, where the Node app sits
    // behind Nginx and Nginx handles SSL for us. For development,
    // where we assume we're not running SSL, we leave secure set to false
    // since otherwise Express will reject the cookie given that
    // it's not encrypted. From the Express documentation:
    //
    // Please note that secure: true is a recommended option. However, it requires
    // an https-enabled website, i.e., HTTPS is necessary for secure cookies.
    // If secure is set, and you access your site over HTTP, the cookie
    // will not be set. If you have your node.js behind a proxy and are
    // using secure: true, you need to set 'trust proxy' in express.
    //
    /* WAIT_FOR_PRODUCTION_SSL
    if (app.get('env') === 'production') {
      sessionOptions.cookie.secure = true;  // serve secure cookies
    }
     END WAIT_FOR_PRODUCTION_SSL */
    // We're sitting behind Nginx. Enable trusting the proxy
    app.enable('trust proxy');

    // See what app version we're running.
    let versionPromise = version.getVersionInfo()
    .then(versionInfo => {
      // Store version info for use in constructing responses.
      app.locals.build = versionInfo.build;
      app.locals.version = versionInfo.version;
    });

    // Headers shared by responses served by Express.
    app.use((request, response, next) => {
      response.set({
        // Enable CORS
        // From http://enable-cors.org/server_expressjs.html
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'X-Requested-With'
      });
      next();
    });

    // Map routes to render functions. These functions return a promise for a
    // block of textual content, usually HTML.
    // Since these routes could also be valid static paths, these declarations
    // have to come before the express.static invocation.
    for (let path in routes) {
      // BUGBUG - map / to /index.html for now
      if (path === '/') {
        app.get(path, (request, response) => {
          response.redirect('/index.html');
        });
        continue;
      }
      
      let renderFunction = routes[path];
      app.get(path, (request, response) => {
        // Render the request as content, or a promise for content.
        let result = renderFunction(request);
        // If the result's not already a promise, cast it to a promise.
        Promise.resolve(result)
        .then(content => {
          // Return the content as the response.
          response.set({
            'Cache-Control': 'no-cache',
            'Content-Type': inferContentType(content)
          });
          response.send(content);
        });
      });
    }

    // Service worker: We don't want this script being served up as a static file, as
    // we want to be able to control the cache settings (at least for now as we're learning
    // best practices). Also, we want to write our service worker Javascript in ES2015, so
    // it needs to be part of the client-side build so that Browserify can get a whack at it.
    // We build service-worker.js as we do other client-side Javascript, then build an
    // Express route here to serve it up out of the build folder.
    /*
    app.get('/service-worker.js', (request, response) => {
      response.set({
        'Cache-Control': 'no-cache',
        'Content-Type': 'application/javascript'
      });
      response.sendFile(`${clientFolder}/${request.app.locals.build}/build/service-worker.js`);
    });
    */

    // Static files.
    let staticPromise = versionPromise.then(() => {
      let port = process.env.ELIX_EXPRESS_PORT || process.env.PORT || 5000;
      server.listen(port, function() {
        // Serve files from the specified client folder.
        // If we're running against public/src on a local test, then set no max-age, otherwise 365 days
        let staticCacheTime = app.locals.build === 'src' ?
          0 :
          1000*60*60*24*365;
        app.use(express.static(clientFolder, {
          maxage: staticCacheTime,
          redirect: false     // Don't automatically redirect from foo to foo/
        }));
        app.use('/', express.static('node_modules/elix'));
        
        logger.info('Web server running on port ' + port + ' (e.g., http://localhost:' + port + ')');
        logger.info('Serving pages from ' + clientFolder);
        logger.info('Using timestamp string: ' + app.locals.build);
        logger.info('Using version string: ' + app.locals.version);
        logger.info('Setting max-age Cache-Control value to ' + staticCacheTime + ' milliseconds');

        // Inform any test hooks that the server (ie, Express) has started
        if (testHookExpressStarted) {
          testHookExpressStarted();
        }

        // Signal the Nginx buildpack that it should begin listening
        // This has no effect on development machines
        logger.info('Writing to app-initialized to signal Nginx');
        fs.openSync('/tmp/app-initialized', 'w');
      });
    });

    return Promise.all(versionPromise, staticPromise);
  }
};


// Given textual content to return, infer its Content-Type.
function inferContentType(content) {
  if (content.startsWith('<!DOCTYPE html>')) {
    return 'text/html';
  } else if (content.startsWith('<?xml')) {
    return 'text/xml';
  } else if (content.startsWith('{')) {
    return 'application/json';
  } else {
    return 'text/plain';
  }
}
