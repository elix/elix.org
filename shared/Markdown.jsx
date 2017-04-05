import { Component, h } from 'preact'; // jshint ignore:line
import marked from 'marked';


marked.setOptions({
  gfm: true   // Use GitHub-flavored markdown.
});


export default class Markdown extends Component {

  render(props) {
    const html = marked(props.markdown);
    return (
      <div dangerouslySetInnerHTML={{ __html: html }} />
    );
  }

}


// function expandDemos(html) {
//   const demoRegex = /<a href="(.+)">(.+)<\/a>/g;
//   return html.replace(demoRegex, (match, href, text) => {
//     return `Replace ${href} with ${text}`;
//   });
// }
