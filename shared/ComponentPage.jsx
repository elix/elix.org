import { h } from 'preact'; // jshint ignore:line
import componentDocumentation from './componentDocumentation';
import Header from './Header';
import PageSection from './PageSection';
import PageTemplate from './PageTemplate';


/**
 * Error page.
 */
export default class ComponentPage extends PageTemplate {

  get asyncProperties() {
    const componentName = this.props.request.params.name;
    const documentationPromise = componentDocumentation(componentName);
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
