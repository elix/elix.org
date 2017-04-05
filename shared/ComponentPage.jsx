import { Component, h } from 'preact'; // jshint ignore:line
import DocumentationPage from './DocumentationPage';
import DocumentationSection from './DocumentationSection';
import Markdown from './Markdown';


/**
 * Documentation for an element or mixin.
 */
export default class ComponentPage extends Component {

  get asyncProperties() {
    const componentName = this.props.request.params.name;

    // TODO: Remove when we start to render API documentation ourselves.
    const htmlPath = `/build/docs/${componentName}.html`;
    const htmlPromise = this.props.readSiteFile(htmlPath)
    .then(response => {
      return response;
    });

    // Get the JSON for the API documentation.
    const apiPath = `/build/docs/${componentName}.json`;
    const apiPromise = this.props.readSiteFile(apiPath)
    .then(response => {
      return JSON.parse(response);
    });

    // Get the Markdown for the overview documentation.
    const overviewPath = `/markdown/${componentName}.md`;
    const overviewPromise = this.props.readSiteFile(overviewPath)
    .then(response => {
      return response;
    })
    .catch(exception => {
      return null;
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
          <DocumentationSection documentation={props.html}/>
        </section>
      </DocumentationPage>
    );
  }

  get title() {
    return this.props.request.params.name;
  }

}
