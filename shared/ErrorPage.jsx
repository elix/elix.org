import { h } from 'preact'; // jshint ignore:line
import PageTemplate from './PageTemplate';


/**
 * Error page.
 */
export default class ErrorPage extends PageTemplate {

  render(props) {
    return (
      <PageTemplate
          title={this.title}
          url={props.url}
        >
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
