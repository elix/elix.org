import { Component, h } from 'preact'; // jshint ignore:line
import DocumentationPage from './DocumentationPage';
import fetch from 'node-fetch';
import Markdown from './Markdown';


/**
 * Documentation for an element or mixin.
 */
export default class MarkdownPage extends Component {

  get asyncProperties() {
    const parts = this.props.request.path.split('/');
    const title = parts[parts.length - 1];
    const url = `${this.props.baseUrl}/markdown/${title}.md`;
    return fetch(url)
    .then(response => {
      return response.text();
    })
    .then(markdown => {
      return { markdown };
    });
  }

  render(props) {
    return (
      <DocumentationPage request={props.request}>
        <Markdown markdown={props.markdown}/>
      </DocumentationPage>
    );
  }

}
