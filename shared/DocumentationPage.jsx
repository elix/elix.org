import { Component, h } from 'preact'; // jshint ignore:line
import DocumentationNavigation from './DocumentationNavigation';
import PageTemplate from './PageTemplate';


/**
 * Documentation for an element or mixin.
 */
export default class DocumentationPage extends Component {

  render(props) {
    const componentName = props.request.params.name;
    const sideNavigation = (<DocumentationNavigation current={componentName}/>);

    return (
      <PageTemplate
          request={props.request}
          sideNavigation={sideNavigation}
        >
        {props.children}
      </PageTemplate>
    );
  }

  get title() {
    return this.props.request.params.name;
  }

}
