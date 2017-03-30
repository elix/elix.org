import { h } from 'preact'; // jshint ignore:line
import getDocumentation from './getDocumentation';
import Header from './Header';
import PageSection from './PageSection';
import PageTemplate from './PageTemplate';


/**
 * Documentation for an element or mixin.
 */
export default class DocumentationPage extends PageTemplate {

  get asyncProperties() {
    const path = this.props.request.path;
    const documentationPromise = getDocumentation(path);
    return documentationPromise.then(documentation => {
      return { documentation };
    });
  }

  render(props) {
    const componentName = props.request.params.name;
    return (
      <PageTemplate
          title={componentName}
          url={props.url}
        >
        <PageSection class="section0">
          <Header/>
          <h1>{componentName}</h1>
        </PageSection>
        <PageSection class="section1">
          <div dangerouslySetInnerHTML={{ __html: props.documentation }}/>
        </PageSection>
      </PageTemplate>
    );
  }

  get title() {
    return this.props.request.params.name;
  }

}
