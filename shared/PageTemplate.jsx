import { Component, h } from 'preact'; // jshint ignore:line
import Footer from './Footer';
import Header from './Header';
import PageSection from './PageSection';


/**
 * Template for a standard page on the site.
 */
export default class PageTemplate extends Component {

  render(props) {
    return (
      <article>
        <PageSection class="section0">
          <Header/>
          <h1>{props.title}</h1>
        </PageSection>
        <div class="sideNavigation">{props.sideNavigation}</div>
        {props.children}
        <Footer/>
      </article>
    );
  }

}
