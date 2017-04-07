/*jslint node: true */
'use strict';

const fs = require('fs');
const jsDocParse = require('jsdoc-parse');
const dmd = require('dmd');
const Readable = require('stream').Readable;
const marked = require('marked');

const outputPath = './build/docs/';

//
// Array of peer directories for use in docsList
//
const sourceDirs = ['node_modules/elix/elements', 'node_modules/elix/mixins'];

//
// Build the global docsList array for use in building the package's README.md documentation
//
let docsList;
sourceDirs.forEach((dir) => {
  docsList = docsList ? docsList.concat(buildDocsList(dir)) : buildDocsList(dir);
});

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
        destJSON: `${outputPath}${fileRoot}.json`,
        destMD: `${outputPath}${fileRoot}.md`,
        destHTML: `${outputPath}${fileRoot}.html`
      };
    });
}

function buildMarkdownDoc(docItem) {
  console.log('Building ' + docItem.destJSON + ' from ' + docItem.src);

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
    
    return json;
  })
  .then(function(json) {
    // Write the json to output file
    return new Promise(function(resolve, reject) {
      fs.writeFile(docItem.destJSON, JSON.stringify(json, null, 2), 'utf-8', function (err) {
        if (err) {
          return reject(err);
        }
        resolve(json);
      });
    });
  /*  
  })
  .then(function(json) {
    // Convert json to markdown
    return parseJSONToMarkdown(json);
  })
  .then(function(markdown) {
    // Write the markdown to the output file
    return new Promise(function(resolve, reject) {
      fs.writeFile(docItem.destMD, markdown, 'utf-8', function(err) {
        if (err) {
          return reject(err);
        }
        resolve(markdown);
      });
    });
  })
  .then(function(markdown) {
    // Convert markdown to HTML and write to output file
    let html = marked(markdown);
    return new Promise(function(resolve, reject) {
      fs.writeFile(docItem.destHTML, html, 'utf-8', function(err) {
        if (err) {
          return reject(err);
        }
        resolve();
      });
    });
  */
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
      './server/md-templates/main.hbs',
      './server/md-templates/scope.hbs',
      './server/md-templates/mixes.hbs',
      './server/md-templates/mixin-linked-type-list.hbs'];
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
    const fileName = mixin + '.js';

    for (let i = 0; i < sourceDirs.length; i++) {
      const dir = sourceDirs[i];
      const fullPath = `${dir}/${fileName}`;
      if (fs.existsSync(fullPath)) {
        return fullPath;
      }  
    }
    
    return '';
  });

  const hostId = componentJson[0].id;
  return mapAndChain(mixins, mixin => mergeMixinIntoBag(mixin, componentJson, hostId))
  .then(() =>
    componentJson
  );
}

function resolveOriginalMemberOf(omo) {
  if (omo !== undefined) {
    let strings = omo.split(/:|~/);
    switch (strings.length) {
      case 1:
        omo = `${strings[0]}Mixin`;
        break;
      case 3:
        omo = strings[1];
        break;
      default:
        break;
    }
  }
  
  return omo;
}

function mergeMixinIntoBag(mixinPath, componentJson, hostId) {
  return parseScriptToJSDocJSON(mixinPath)
  .then(mixinJson => {
    for (let i = 1; i < mixinJson.length; i++) {
      if (mixinJson[i].memberof != null && mixinJson[i].memberof != hostId) {
        mixinJson[i].originalmemberof = resolveOriginalMemberOf(mixinJson[i].memberof);
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