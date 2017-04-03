import { Component, h } from 'preact'; // jshint ignore:line
import Footer from './Footer';
import Header from './Header';


/**
 * Template for a standard page on the site.
 */
export default class PageTemplate extends Component {

  render(props) {
    return (
      <div class="pageContainer" data-path={props.request.path}>
        <Header headerTexture={props.headerTexture}/>
        <div class="mainContent contentContainer">
          <div class="gutter sideNavigation">
            <h1>&nbsp;</h1>
            <div class="navigationContainer">
              {props.sideNavigation}
            </div>
          </div>
          <article>
            {props.children}
            <Footer/>
          </article>
          <div class="gutter"/>
        </div>
      </div>
    );
  }

}
