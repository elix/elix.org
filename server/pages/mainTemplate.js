/*
 * Render a page using the main Elix.org template.
 */

'use strict';

let fs = require('fs');
let path= require('path');
let promisify = require('../promisify');
let readFileAsync = promisify(fs.readFile);
let header = require('./header')();
let footer = require('./footer')();

let css;
let analytics;

// Load some static includes.
let initializePromise = readFileAsync(path.join(__dirname, 'main.css'))
.then(result => {
  css = result;
  return readFileAsync(path.join(__dirname, 'analytics.html'));
})
.then(result => {
  analytics = result;
});


// Wait for initialization to be complete, then return result.
module.exports = (request, data) => initializePromise.then(() =>
`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1.0">
  <base href="/${request.app.locals.build}/">
  <link rel="shortcut icon" href="resources/images/favicon.ico" type="image/x-icon" />
  <title>${data.title} – Elix</title>
  <style>
  ${css}
  </style>
  ${analytics}
  ${data.head || ''}
</head>

<body>
  ${header}
  <div class="pageMain">
    ${data.content}
  </div>
  ${footer}
</body>

</html>
`);
