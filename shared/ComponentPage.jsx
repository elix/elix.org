import { Component, h } from 'preact'; // jshint ignore:line
import DocumentationPage from './DocumentationPage';
import DocumentationSection from './DocumentationSection';
import expandDemos from './expandDemos';
import marked from 'marked';


marked.setOptions({
  gfm: true   // Use GitHub-flavored markdown.
});

/**
 * Documentation for an element or mixin.
 */
export default class ComponentPage extends Component {

  get asyncProperties() {
    const componentName = this.props.request.params.name;
    
    // Get the JSON for the DocumentationNavigation panel
    const navPath = '/build/docsNavigation.json';
    const navigationPromise = this.props.readSiteFile(navPath)
    .then(response => {
      return JSON.parse(response);
    })
    .catch(() => {
      return null;
    });

    // Get the JSON for the API documentation.
    const apiPath = `/build/docs/${componentName}.json`;
    let json;
    const apiPromise = this.props.readSiteFile(apiPath)
    .then(response => {
      json = JSON.parse(response);
      // Preprocess Markdown and demos.
      // We need to do this here because fetching demos is asynchronous.
      if (json[0] && json[0].description) {
        const html = marked(json[0].description);
        return expandDemos(html, this.props.readSiteFile);
      } else {
        return Promise.resolve(null);
      }
    })
    .then(descriptionHtml => {
      if (json[0] && json[0].description && descriptionHtml) {
        json[0].description = descriptionHtml;
      }
      return json;
    })
    .catch(() => {
      return null;
    });

    // Get the Markdown for the component overview (if it exists).
    const overviewPath = `/content/${componentName}.md`;
    const overviewPromise = this.props.readSiteFile(overviewPath)
    .then(response => {
      // Convert to HTML.
      const html = marked(response);
      return expandDemos(html, this.props.readSiteFile);
    })
    .catch(exception => {
      return null;
    });

    return Promise.all([apiPromise, overviewPromise, navigationPromise])
    .then(results => {
      return {
        api: results[0],
        overview: results[1],
        navigation: results[2]
      };
    })
    .catch(() => {
      return {
        api: null,
        overview: null,
        navigation: null
      };
    });
  }

  render(props) {
      
    const api = props.api;
    const apiHeader = api ? 
      api[0] : 
      {name: `"${this.props.request.params.name}" not found`, description: ''};

    const overview = props.overview ?
      // Found an overview for the component.
      (<section dangerouslySetInnerHTML={{ __html: props.overview }} />) :

      // No overview for this component, use the jsDoc header docs instead.
      // NOTE: As indicated above, the description (if it exists) will have
      // already been translated to HTML.
      (
        <section>
          <h1>{apiHeader.name}</h1>
          <div dangerouslySetInnerHTML={{ __html: apiHeader.description }}/>
        </section>
      );
    return (
      <DocumentationPage request={props.request} navigation={props.navigation}>
        {overview}
        <DocumentationSection documentation={props.api}/>
      </DocumentationPage>
    );
  }

  get title() {
    return this.props.request.params.name;
  }

}
