import { h } from 'preact'; // jshint ignore:line
import getDocumentation from './getDocumentation';
import PageSection from './PageSection';
import PageTemplate from './PageTemplate';


/**
 * Documentation for an element or mixin.
 */
export default class DocumentationPage extends PageTemplate {

  get asyncProperties() {
    const path = this.props.request.path;
    const url = `${this.props.baseUrl}/markdown${path}.md`;
    const documentationPromise = getDocumentation(url);
    return documentationPromise.then(documentation => {
      return { documentation };
    });
  }

  render(props) {
    const componentName = props.request.params.name;

    const sideNavigation = <p>Side nav goes here</p>;

    return (
      <PageTemplate
          title={componentName}
          sideNavigation={sideNavigation}
        >
        <PageSection class="section1 documentation">
          <div dangerouslySetInnerHTML={{ __html: props.documentation }}/>
        </PageSection>
      </PageTemplate>
    );
  }

  get title() {
    return this.props.request.params.name;
  }

}
