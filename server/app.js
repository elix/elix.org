/*
 * Express web server.
 *
 * This mostly just fronts the Atlassian Confluence wiki, presenting the wiki
 * content in a read-only format branded with the project's identity.
 */

// const path = require('path');
const express = require('express');
const app = express();
const port = process.env.PORT || 5000;

const h = require('preact').h;
const render = require('preact-render-to-string');

const shared = require('../build/server');
// const AppShell = shared.AppShell;
const AppShell = shared.default;

// const renderReactRoute = require('./renderReactRoute');
//
// const CACHE_MAX_AGE_SECONDS = 300; // Cache for 5 minutes
// const CACHE_CONTROL_VALUE = `public,max-age=${CACHE_MAX_AGE_SECONDS}`;


// Tell Express to serve up static content from the ./static folder.
// const staticPath = path.join(__dirname, 'static');
// app.use('/static', express.static(staticPath, {
//   maxAge: CACHE_MAX_AGE_SECONDS * 1000 // Convert to milliseconds
// }));


//
// General route handler for pages that can be rendered by React components.
//
app.get('*', (request, response, next) => {

  // let renderPromise;
  // try {
  //   renderPromise = renderReactRoute(request);
  // } catch(exception) {
  //   // Catch exceptions during creation of the promise.
  //   logException(exception);
  //   request.url = '/error';
  //   next();
  //   return;
  // }

  // renderPromise.then(html => {
  //   if (html) {
  //     response.set({
  //       'Cache-Control': CACHE_CONTROL_VALUE,
  //       'Content-Type': 'text/html'
  //     });
  //     response.send(html);
  //   } else {
  //     // We didn't have a React component for this route; shouldn't happen.
  //     next();
  //   }
  // });
  // .catch(exception => {
  //   // Catch exceptions during resolution of the promise.
  //   logException(exception);
  //   request.url = '/error';
  //   next();
  // });

  const rendered = render(h(AppShell, { title: "Hello" }));
  // const instance = new AppShell();
  // const rendered = instance.render({ title: "Hello" });

  // Prepend DOCTYPE processing instruction, which React can't render.
  const html = `<!DOCTYPE html>${rendered}`;

  response.set({
    'Content-Type': 'text/html'
  });
  response.send(html);

});

// // Error handler.
// app.get('/error', (request, response, next) => {
//   renderReactRoute(request)
//   .then(html => {
//     if (html) {
//       response.set({
//         'Content-Type': 'text/html'
//       });
//       response.status(500);
//       response.send(html);
//     }
//   });
//   // Don't catch exceptions.
// });
//
// // Log an error message.
// function logException(exception) {
//   console.log(`*** Exception: ${exception}`);
// }


//
// Start the server
//
app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});
