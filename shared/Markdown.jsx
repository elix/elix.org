import { Component, h } from 'preact'; // jshint ignore:line
import marked from 'marked';


marked.setOptions({
  gfm: true   // Use GitHub-flavored markdown.
});


export default class Markdown extends Component {

  render(props) {
    const html = marked(props.markdown);
    const adjusted = adjustLinks(html);
    return (
      <div dangerouslySetInnerHTML={{ __html: adjusted }} />
    );
  }

}


// Map links to other Markdown files in GitHub folders to our URL format.
function adjustLinks(html) {

  // Map URLs that point from an element doc to a mixin doc, or vice versa.
  const html1 = html.replace(/href="[^"]+\/(?:mixins|elements)\/docs\/([^"]*)\.md"/g, 'href="/documentation/$1"');

  // Map URLs that point from an element or mixin doc to same kind of doc.
  const html2 = html1.replace(/(href="[^"]+)\.md(")/g, '$1$2');

  return html2;
}
