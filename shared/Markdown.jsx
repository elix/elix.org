import { Component, h } from 'preact'; // jshint ignore:line
import marked from 'marked';
import highlight from 'highlight.js';


marked.setOptions({
  gfm: true,   // Use GitHub-flavored markdown.
  hightlight: code => {
    return highlight.highlightAuto(code).value;
  }
});


export default class Markdown extends Component {

  render(props) {
    const html = marked(props.markdown);
    return (
      <div class={props.class} dangerouslySetInnerHTML={{ __html: html }} />
    );
  }

}
