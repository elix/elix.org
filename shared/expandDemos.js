/*
 * Given Markdown that may contain links to demos, return a promise to inline
 * the demos. The demo links should start with "/demos/".
 * Use the readSiteFile function to read the demo files.
 */
export default function(markdown, readSiteFile) {
  // const demoLinkRegex = /\[(.+)]\((\/demos\/.+)\)/g;
  const demoLinkRegex = /<p><a href="(.+)">(.+)<\/a><\/p>/g;
  const promises = matches(markdown, demoLinkRegex).map(match => {
    const demoPath = match[1];
    return loadDemo(demoPath, readSiteFile);
  });
  return Promise.all(promises)
  .then(demos => {
    return markdown.replace(demoLinkRegex, (match, demoPath, text) => {
      const demo = demos.shift();
      return `
        <div class="demoContainer">
          ${demo}
          <div class="demoCaption">
            Demo: ${text}
            <a class="demoLink" href="${demoPath}" target="_blank">⇒</a>
          </div>
        </div>
      `;
    });
  });
}

function loadDemo(demoPath, readSiteFile) {
  const relativePath = `/node_modules/elix${demoPath}`;
  return readSiteFile(relativePath)
  .then(source => {
    // Extract demo from inside of a div with class="demo".
    // const bodyRegex = /<body>([\s\S]*)<\/body>/;
    const bodyRegex = /(<div class="demo(?: .*)?".*>[\s\S]*<\/div>)/;
    const match = bodyRegex.exec(source);
    return match ?
      match[1] :
      '';
  })
  .catch(exception => {
    console.log(exception);
  });
}

function matches(text, regex) {
  let results = [];
  let match = regex.exec(text);
  while (match) {
    results.push(match);
    match = regex.exec(text);
  }
  return results;
}
