/*jslint node: true */
'use strict';

const bd = require('../node_modules/elix/tasks/buildDocsHelper.js');

bd.setInputPath('./node_modules/elix/');
bd.setOutputPath('./build/docs/');
bd.buildDocs();