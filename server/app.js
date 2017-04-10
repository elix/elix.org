/*
 * Express web server.
 */

const path = require('path');
const express = require('express');
const app = express();
const port = process.env.PORT || 5000;

const renderReactRoute = require('./renderReactRoute');


// Tell Express to serve up static content.
app.use('/static', express.static(path.join(__dirname, '../public')));
app.use('/elix', express.static(path.join(__dirname, '../node_modules/elix')));
app.use('/demos', express.static(path.join(__dirname, '../node_modules/elix/demos')));
app.use('/build', express.static(path.join(__dirname, '../node_modules/elix/build')));

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
        'Content-Type': 'text/html'
      });
      response.send(html);
    } else {
      // We didn't have a React component for this route; shouldn't happen.
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


//
// Start the server
//
app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});
