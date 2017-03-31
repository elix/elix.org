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
      <div>
        <Header/>
        <div class="pageContainer">
          <div class="gutter sideNavigation">{props.sideNavigation}></div>
          <article>
            <h1>{props.title}</h1>
            {props.children}
            <Footer/>
          </article>
          <div class="gutter"/>
        </div>
      </div>
    );
  }

}
