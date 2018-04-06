import { h } from 'preact'; // jshint ignore:line
import PageTemplate from './PageTemplate';


/**
 * Error page.
 */
export default class ErrorPage extends PageTemplate {

  render(props) {
    return (
      <PageTemplate
          request={props.request}
          title={this.title}
          url={props.url}
        >
        <h1>{this.title}</h1>
        <p>
          Sorry, something went wrong. 😞
        </p>
      </PageTemplate>
    );
  }

  get title() {
    return "Oops";
  }

}
