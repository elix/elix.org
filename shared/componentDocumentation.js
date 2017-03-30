import fetch from 'node-fetch';
import marked from 'marked';


marked.setOptions({
  gfm: true   // Use GitHub-flavored markdown.
});


/**
 * Return a promise for the HTML for the markdown docs for the component with
 * the given name.
 */
export default function(componentName) {
  const markdownPath = `http://localhost:5000/markdown/${componentName}.md`;
  console.log(markdownPath);
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


function adjustLinks(html) {
  // Replace links to other Markdown files to point to our URLs. This just
  // removes the ".md" from the href.
  return html.replace(/(href="[^"]+)\.md(")/g, '$1$2');
}
