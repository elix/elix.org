import { Component, h } from 'preact'; // jshint ignore:line
// import Header from './Header';
import PageSection from './PageSection';


/**
 * Template for a standard page on the site.
 */
export default class PageTemplate extends Component {

  render(props) {
    return (
      <article>
        {props.children}
        <footer>
          <PageSection>
            © 2017 Elix project
          </PageSection>
        </footer>
      </article>
    );
  }

}
