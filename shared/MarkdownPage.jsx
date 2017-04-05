import { Component, h } from 'preact'; // jshint ignore:line
import DocumentationPage from './DocumentationPage';
import Markdown from './Markdown';


/**
 * Documentation for an element or mixin.
 */
export default class MarkdownPage extends Component {

  get asyncProperties() {
    const parts = this.props.request.path.split('/');
    const title = parts[parts.length - 1] || 'Introduction';
    const path = `/markdown/${title}.md`;
    return this.props.readSiteFile(path)
    .then(markdown => {
      return { markdown, title };
    });
  }

  render(props) {
    return (
      <DocumentationPage request={props.request} title={props.title}>
        <Markdown markdown={props.markdown}/>
      </DocumentationPage>
    );
  }

}
