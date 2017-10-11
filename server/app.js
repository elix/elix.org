/*
 * Express web server.
 */

const path = require('path');
const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const version = require('./version.js');

const renderReactRoute = require('./renderReactRoute');

// Cache-Control maxage values expressed in seconds and milliseconds
// Set to 10 minutes
const cacheMinutes = 10;
const cacheSeconds = 60 * cacheMinutes;
const cacheMilliseconds = cacheSeconds * 1000;


//
// Redirect http to https under Heroku
//
app.get('*', (request, response, next) => {
  if (request.headers['x-forwarded-proto'] && request.headers['x-forwarded-proto'] !== 'https') {
    response.redirect(301, `https://${request.hostname}${request.url}`);
  } else {
    next(); // Continue to other routes if we're not redirecting
  }
});

//
// General route handler for pages that can be rendered by React components.
//
app.get('*', (request, response, next) => {
  
  let renderPromise;
  try {
    renderPromise = renderReactRoute(request);
  } catch(exception) {
    // Catch exceptions during creation of the promise.
    logException(exception);
    request.url = '/error';
    next();
    return;
  }

  renderPromise.then(html => {
    if (html) {
      response.set({
        'Content-Type': 'text/html',
        'Cache-Control': 'no-cache'
      });
      response.send(html);
    } else {
      // We didn't have a React component for this route.
      next();
    }
  })
  .catch(exception => {
    // Catch exceptions during resolution of the promise.
    logException(exception);
    request.url = '/error';
    next();
  });

});

// Serve remaining routes as static content out of the Elix project.
// This is used to obtain demos and their associated files.
app.use('/', express.static(path.join(__dirname, '../node_modules/elix'), {maxAge: `${cacheMilliseconds}`}));

// Error handler.
app.get('/error', (request, response, next) => {
  renderReactRoute(request)
  .then(html => {
    if (html) {
      response.set({
        'Content-Type': 'text/html'
      });
      response.status(500);
      response.send(html);
    }
  });
  // Don't catch exceptions.
});

// Log an error message.
function logException(exception) {
  console.log(`*** Exception: ${exception}`);
}


// Cache the app's version and build for display in the version page
version.getVersionInfo()
.then(versionInfo => {
  // Store version info for use in constructing responses.
  app.locals.build = versionInfo.build;
  app.locals.version = versionInfo.version;
  return versionInfo;
})
.then(versionInfo => {
  // Tell Express to serve up static content.
  // If we're running against public/src on a local test, then set no max-age, 
  // otherwise 365 days
  const logicalPath = `/static/${versionInfo.build}`;
  const filePath = `../public/${versionInfo.build}`;
  const staticCacheTime = versionInfo.build === 'src' ?
          0 :
          1000*60*60*24*365;
  app.use(logicalPath, express.static(path.join(__dirname, filePath), {maxAge: `${staticCacheTime}`}));

  //
  // Start the server
  //
  app.listen(port, () => {
    console.log(`Server listening on http://localhost:${port}, version ${versionInfo.version}, build ${versionInfo.build}`);
  });
});
