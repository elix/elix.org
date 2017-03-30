import fetch from 'node-fetch';
import marked from 'marked';


marked.setOptions({
  gfm: true   // Use GitHub-flavored markdown.
});


/**
 * Return a promise for the HTML for the markdown docs for the component with
 * the given name.
 */
export default function(path) {
  const markdownPath = `http://localhost:5000/markdown${path}.md`;
  return fetch(markdownPath)
  .then(response => {
    return response.text();
  })
  .then(markdown => {
    const html = marked(markdown);
    const adjusted = adjustLinks(html);
    return adjusted;
  });
}


// Map links to other Markdown files in GitHub folders to our URL format.
function adjustLinks(html) {

  // Map URLs that point from an element doc to a mixin doc, or vice versa.
  const html1 = html.replace(/(href="[^"]+\/)(mixins|elements)\/docs(\/[^"]*)\.md(")/g, '$1$2$3$4');

  // Map URLs that point from an element or mixin doc to same kind of doc.
  const html2 = html1.replace(/(href="[^"]+)\.md(")/g, '$1$2');

  return html2;
}
