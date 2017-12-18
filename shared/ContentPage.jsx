import { Component, h } from 'preact'; // jshint ignore:line
import DocumentationPage from './DocumentationPage';
import Markdown from './Markdown';


/**
 * A general-purpose content page in the Documentation area.
 */
export default class ContentPage extends Component {

  get asyncProperties() {
    const parts = this.props.request.path.split('/');
    const title = parts[parts.length - 1] || 'Introduction';
    const path = `/content/${title}.md`;
    let navigation;

    // Get the JSON for the DocumentationNavigation panel
    const navPath = '/build/docsNavigation.json';
    return this.props.readSiteFile(navPath)
    .then(response => {
    	navigation = JSON.parse(response);
    })
		.then(() => {
	    return this.props.readSiteFile(path);
		})
    .then(markdown => {
      return { markdown, title, navigation };
    });
  }

  render(props) {
    return (
      <DocumentationPage request={props.request} title={props.title} navigation={props.navigation}>
        <Markdown markdown={props.markdown}/>
      </DocumentationPage>
    );
  }

}
