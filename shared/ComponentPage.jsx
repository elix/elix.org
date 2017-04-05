import { Component, h } from 'preact'; // jshint ignore:line
import DocumentationPage from './DocumentationPage';
import DocumentationSection from './DocumentationSection';
import fetch from 'node-fetch';
import Markdown from './Markdown';


/**
 * Documentation for an element or mixin.
 */
export default class ComponentPage extends Component {

  get asyncProperties() {
    const componentName = this.props.request.params.name;

    // TODO: Remove when we start to render API documentation ourselves.
    const htmlUrl = `${this.props.baseUrl}/json/${componentName}.html`;
    const htmlPromise = fetch(htmlUrl)
    .then(response => {
      return response.text();
    });

    // Get the JSON for the API documentation.
    const apiUrl = `${this.props.baseUrl}/json/${componentName}.json`;
    const apiPromise = fetch(apiUrl)
    .then(response => {
      return response.json();
    });

    // Get the Markdown for the overview documentation.
    const overviewUrl = `${this.props.baseUrl}/markdown/${componentName}.md`;
    const overviewPromise = fetch(overviewUrl)
    .then(response => {
      return response.status === 200 ?
        response.text() :
        null;
    });

    return Promise.all([apiPromise, overviewPromise, htmlPromise])
    .then(results => {
      return {
        api: results[0],
        overview: results[1],
        html: results[2]
      };
    });
  }

  render(props) {

    const api = props.api;
    const apiHeader = api[0];

    const overview = props.overview ?
      // Found an overview Markdown for the component.
      (
        <section>
          <Markdown markdown={props.overview}/>
        </section>
      ) :
      // No overview for this component, use the jsDoc header docs instead.
      (
        <section>
          <h1>{apiHeader.name}</h1>
          <Markdown markdown={apiHeader.description}/>
        </section>
      );

    return (
      <DocumentationPage request={props.request}>
        {overview}
        <h1>API documentation</h1>
        <p>
          Rendered API documentation for {apiHeader.name} goes here...
        </p>
        <section>
          <DocumentationSection documentation={props.api}/>
        </section>
      </DocumentationPage>
    );
  }

  get title() {
    return this.props.request.params.name;
  }

}
