import { Component, h } from 'preact'; // jshint ignore:line
import DocumentationPage from './DocumentationPage';


/**
 * Documentation for an element or mixin.
 */
export default class MarkdownPage extends Component {

  render(props) {
    return (
      <DocumentationPage request={props.request}>
        <h1>Hello, world</h1>
      </DocumentationPage>
    );
  }

}
