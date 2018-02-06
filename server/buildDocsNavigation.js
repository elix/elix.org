/*jslint node: true */
'use strict';

const fs = require('fs-extra');
const promisify = require('./promisify');
const readDirAsync = promisify(fs.readdir);
const writeJsonAsync = promisify(fs.writeJson);

const outputPath = './build/docsNavigation.json';

function clean() {
  const removePromise = promisify(fs.remove);
  return removePromise(outputPath);
}

function buildDocsNavigation() {
	let docsNavigation = {
		elements: [],
		helpers: [],
		mixins: []
	};
	
	clean()
	.then(() => {
		return readDirAsync('./build/docs');
	})
	.then(files => {
		let navObjects = files.map(file => {
			// Strip off the .json extension
			return file.substring(0, file.length - 5);
		});
		
		navObjects.forEach(navObject => {
			if (navObject.endsWith('Wrapper')) {
				docsNavigation.helpers.push(navObject);
			}
			else if (navObject.endsWith('Mixin')) {
				docsNavigation.mixins.push(navObject);
			}
			else if (navObject.charAt(0) === navObject.charAt(0).toLowerCase()) {
				docsNavigation.helpers.push(navObject);
			}
			else {
				docsNavigation.elements.push(navObject);
			}
		});
	})
	.then(() => {
		return writeJsonAsync(
			outputPath,
			docsNavigation, 
			{spaces: 2});
	});
}

buildDocsNavigation();