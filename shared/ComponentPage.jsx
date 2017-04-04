import { Component, h } from 'preact'; // jshint ignore:line
import getDocumentation from './getDocumentation';
import DocumentationPage from './DocumentationPage';


/**
 * Documentation for an element or mixin.
 */
export default class ComponentPage extends Component {

  get asyncProperties() {

    // HACK until we can have all JSON docs live in the same flat folder.
    const elements = [
      'LabeledTabButton',
      'LabeledTabs',
      'ListBox',
      'Modes',
      'Tabs',
      'TabStrip'
    ];
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
      <DocumentationPage request={props.request}>
        <h1>{componentName}</h1>
        <section class="section1 documentation">
          <div dangerouslySetInnerHTML={{ __html: props.documentation }}/>
        </section>
      </DocumentationPage>
    );
  }

  get title() {
    return this.props.request.params.name;
  }

}
