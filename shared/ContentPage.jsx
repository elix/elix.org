import { Component, h } from 'preact'; // jshint ignore:line
import DocumentationPage from './DocumentationPage';
import Markdown from './Markdown';


/**
 * A general-purpose content page in the Documentation area.
 */
export default class ContentPage extends Component {

  get asyncProperties() {
    const parts = this.props.request.path.split('/');
    const title = parts[parts.length - 1] || 'Introduction';
    const path = `/content/${title}.md`;
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
