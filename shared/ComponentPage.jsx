import { Component, h } from 'preact'; // jshint ignore:line
import DocumentationPage from './DocumentationPage';
import fetch from 'node-fetch';


/**
 * Documentation for an element or mixin.
 */
export default class ComponentPage extends Component {

  get asyncProperties() {
    const componentName = this.props.request.params.name;
    const url = `${this.props.baseUrl}/json/${componentName}.json`;
    return fetch(url)
    .then(response => {
      return response.json();
    })
    .then(documentation => {
      return { documentation };
    });
  }

  render(props) {

    const componentName = props.request.params.name;

    return (
      <DocumentationPage request={props.request}>
        <h1>{componentName}</h1>
        <section class="section1 documentation">
          {JSON.stringify(props.documentation, null, 2)}
        </section>
      </DocumentationPage>
    );
  }

  get title() {
    return this.props.request.params.name;
  }

}
