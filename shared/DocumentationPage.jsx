import { h } from 'preact'; // jshint ignore:line
import getDocumentation from './getDocumentation';
import DocumentationNavigation from './DocumentationNavigation';
import PageSection from './PageSection';
import PageTemplate from './PageTemplate';


/**
 * Documentation for an element or mixin.
 */
export default class DocumentationPage extends PageTemplate {

  get asyncProperties() {

    // HACK until we can have all JSON docs live in the same flat folder.
    const elements = ['LabeledTabs', 'ListBox', 'Modes', 'Tabs'];
    const name = this.props.request.params.name;
    const type = elements.includes(name) ? 'elements' : 'mixins';

    // const path = this.props.request.path;
    const path = `/${type}/${name}`;
    const url = `${this.props.baseUrl}/markdown${path}.md`;
    const documentationPromise = getDocumentation(url);
    return documentationPromise.then(documentation => {
      return { documentation };
    });
  }

  render(props) {
    const componentName = props.request.params.name;

    return (
      <PageTemplate
          title={componentName}
          navigationLinks={<DocumentationNavigation/>}
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
