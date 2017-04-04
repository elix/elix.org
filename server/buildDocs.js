/*jslint node: true */
'use strict';

const fs = require('fs');
const jsDocParse = require('jsdoc-parse');
const dmd = require('dmd');
const Readable = require('stream').Readable;

const outputMarkdown = false;  // true: markdown, false: json
const outputPath = 'build/docs/';
const outputExtension = outputMarkdown ? '.md' : '.json';

//
// Build the global docsList array for use in building the package's README.md documentation
//
const docsList = buildDocsList('node_modules/elix/elements').concat(buildDocsList('node_modules/elix/mixins'));

//
// Build the portion of docsList that represents the individual source files
// within the specified directory.
//
function buildDocsList(dirName) {
  return fs.readdirSync(`${dirName}/`)
    .filter(file => file.endsWith('.js'))
    .map(file => {
      const fileRoot = file.replace('.js', '');
      return {
        src: `${dirName}/${file}`,
        dest: `${outputPath}${fileRoot}${outputExtension}`
      };
    });
}

function buildMarkdownDoc(docItem) {
  console.log('Building ' + docItem.dest + ' from ' + docItem.src);

  return parseScriptToJSDocJSON(docItem.src)
  .then(json => {
    return mergeMixinDocs(json);
  })
  .then(json => {
    // Sort the array, leaving the order:0 item alone at the
    // front of the list (the class identifier section)
    json.sort((a, b) => {
      if (a.order === 0) { return -1; }
      if (b.order === 0) { return 1; }

      return a.name.localeCompare(b.name);
    });

    // Set the order value
    json.map((item, index) => {
      item.order = index;
    });

    if (outputMarkdown) {
      // Convert the JSON to Markdown
      return parseJSONToMarkdown(json);
    }
    else {
      return json;
    }
  })
  .then(function(obj) {
    if (outputMarkdown) {
      let string = obj;

      // Write the markdown to the output file
      return new Promise(function(resolve, reject) {
        fs.writeFile(docItem.dest, string, 'utf-8', function (err) {
          if (err) {
            return reject(err);
          }
          resolve();
        });
      });
    }
    else {
      // Write the json to the output file
      let json = obj;
    
      return new Promise(function(resolve, reject) {
        fs.writeFile(docItem.dest, JSON.stringify(json, null, 2), 'utf-8', function (err) {
          if (err) {
            return reject(err);
          }
          resolve();
        });
      });
    }
  });
}

function parseScriptToJSDocJSON(src) {
  return new Promise((resolve, reject) => {
    // Start by parsing the jsdoc into a stream which will contain
    // the jsdoc represented in JSON
    const stream = jsDocParse({src: src});

    // Convert the stream to jsdoc JSON
    let string = '';
    stream.setEncoding('utf8');
    stream.on('data', chunk => {
      string += chunk;
    })
    .on('end', () => {
      const json = JSON.parse(string);
      resolve(json);
    })
    .on('error', err => {
      reject(err);
    });
  });
}

function parseJSONToMarkdown(json) {
  return new Promise(function(resolve, reject) {
    // Create a new readable stream, holding the stringified JSON
    let string = '';
    const s = new Readable();
    s._read = function noop() {};
    s.push(JSON.stringify(json));
    s.push(null);

    // Use dmd to create the markdown string which we will
    // write to an output .md file (NYI)
    const partials = [
      './node_modules/elix/gulp/templates/main.hbs',
      './node_modules/elix/gulp/templates/scope.hbs',
      './node_modules/elix/gulp/templates/mixes.hbs',
      './node_modules/elix/gulp/templates/mixin-linked-type-list.hbs'];
    const dmdStream = dmd({partial: partials, 'global-index-format': 'none', 'group-by': ['none']});
    s.pipe(dmdStream);
    dmdStream.setEncoding('utf8');
    dmdStream.on('data', data => {
      string += data;
    })
    .on('end', () => {
      // string now holds the markdown text
      resolve(string);
    })
    .on('error', err => {
      reject(err);
    });
  });
}

function mergeMixinDocs(componentJson) {
  if (componentJson.length === 0 ||
      componentJson[0].mixes == null || componentJson[0].mixes === undefined) {
    return componentJson;
  }

  const mixins = componentJson[0].mixes.map(mixin => {
    return 'node_modules/elix/mixins/' + mixin + '.js';
  });

  const hostId = componentJson[0].id;
  return mapAndChain(mixins, mixin => mergeMixinIntoBag(mixin, componentJson, hostId))
  .then(() =>
    componentJson
  );
}

function mergeMixinIntoBag(mixinPath, componentJson, hostId) {
  return parseScriptToJSDocJSON(mixinPath)
  .then(mixinJson => {
    for (let i = 1; i < mixinJson.length; i++) {
      if (mixinJson[i].memberof != null && mixinJson[i].memberof != hostId) {
        mixinJson[i].originalmemberof = mixinJson[i].memberof;
        mixinJson[i].memberof = hostId;
      }
      componentJson.push(mixinJson[i]);
    }
  });
}

// Apply the given promise-returning function to each member of the array.
// Ensure each promise completes before starting the next one to avoid
// spinning up too many file operations at once. This is effectively like
// Promise.all(), while ensuring that the items are processed in a completely
// sequential order.
function mapAndChain(array, promiseFn) {
  // Start the promise chain with a resolved promise.
  return array.reduce((chain, item) => chain.then(() => promiseFn(item)), Promise.resolve());
}


const docsTask = function() {
  if (!fs.existsSync(outputPath)) {
    fs.mkdirSync(outputPath);
  }
  
  return mapAndChain(docsList, doc => buildMarkdownDoc(doc))
  .then(() => console.log('All documentation complete'))
  .catch(err => console.log(`error: ${err}`));
};

module.exports = docsTask;
docsTask();