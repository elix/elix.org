/*jslint node: true */
'use strict';

const buildDocs = require('../node_modules/elix/tasks/buildDocs.js');

buildDocs({
  inputPath: './node_modules/elix/src',
  outputPath: './build/docs'
});
