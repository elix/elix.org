import { Component, h } from 'preact'; // jshint ignore:line
import marked from 'marked';


marked.setOptions({
  gfm: true   // Use GitHub-flavored markdown.
});


export default class Markdown extends Component {

  render(props) {
    const html = marked(props.markdown);
    return (
      <div class={props.class} dangerouslySetInnerHTML={{ __html: html }} />
    );
  }

}
