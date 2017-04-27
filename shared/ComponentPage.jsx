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

    return Promise.all([apiPromise, overviewPromise])
    .then(results => {
      return {
        api: results[0],
        overview: results[1]
      };
    });
  }

  render(props) {

    const api = props.api;
    const apiHeader = api[0];

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

    //
    // "Mixes" section
    //
    let mixesJSX;
    const mixins = apiHeader.mixes;
    if (mixins) {
      const mixinsJSX = mixins.map((mixin, index) => (
        <span>
          { mixins.length > 2 && index > 0 && ', ' }
          { mixins.length > 1 && index === mixins.length -1 && ' and '}
          <a href={mixin}>{mixin}</a>
        </span>
      ));
      mixesJSX = (
        <p>
          This element uses {mixinsJSX}.
        </p>
      );
    }
    
    //
    // "UsedBy" section
    //
    let mixinUsedByJSX;
    const usedBy = apiHeader.mixinUsedBy;
    if (usedBy) {
      const usedByJSX = usedBy.map((item, index) => (
        <span>
          { usedBy.length > 2 && index > 0 && ', ' }
          { usedBy.length > 1 && index === usedBy.length -1 && ' and '}
          <a href={item}>{item}</a>
        </span>
      ));
      mixinUsedByJSX = (
        <p>
          {apiHeader.name} is used by {usedByJSX}.
        </p>
      );
    }
    
    //
    // "InheritsFrom" section
    //
    let inheritsFromJSX;
    if (apiHeader.inheritance) {
      let inheritance = apiHeader.inheritance.reverse();
      inheritance.push(apiHeader.name);
      const inheritanceJSX = inheritance.map((item, index) => (
        <span>
          { index > 0 && ' → '}
          <a href={item}>{item}</a>
        </span>
      ));
      inheritsFromJSX = (
        <p>
          Ancestry: {inheritanceJSX}
        </p>
      );
    }

    //
    // "InheritedBy" section
    //
    let classInheritedByJSX;
    const inheritedBy = apiHeader.classInheritedBy;
    if (inheritedBy) {
      const inheritedJSX = inheritedBy.map((item, index) => (
        <span>
          { inheritedBy.length > 2 && index > 0 && ', ' }
          { inheritedBy.length > 1 && index === inheritedBy.length -1 && ' and '}
          <a href={item}>{item}</a>
        </span>
      ));
      classInheritedByJSX = (
        <p>
          {apiHeader.name} is extended by {inheritedJSX}.
        </p>
      );
    }

    return (
      <DocumentationPage request={props.request}>
        {overview}
        {mixesJSX}
        {mixinUsedByJSX}
        {classInheritedByJSX}
        {inheritsFromJSX}
        <DocumentationSection documentation={props.api}/>
      </DocumentationPage>
    );
  }

  get title() {
    return this.props.request.params.name;
  }

}
