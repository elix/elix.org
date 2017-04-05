import { Component, h } from 'preact'; // jshint ignore:line
import DocumentationPage from './DocumentationPage';
import DocumentationSection from './DocumentationSection';
import fetch from 'node-fetch';


/**
 * Documentation for an element or mixin.
 */
export default class ComponentPage extends Component {

  get asyncProperties() {
    const componentName = this.props.request.params.name;
    const url = `${this.props.baseUrl}/json/${componentName}.html`;
    return fetch(url)
    .then(response => {
      return response.text();
    })
    .then(documentation => {
      return { documentation };
    });
  }

  render(props) {

    return (
      <DocumentationPage request={props.request}>
        <DocumentationSection documentation={props.documentation}>
        </DocumentationSection>
      </DocumentationPage>
    );
  }

  get title() {
    return this.props.request.params.name;
  }

}
