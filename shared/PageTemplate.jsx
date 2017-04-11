import { Component, h } from 'preact'; // jshint ignore:line
import Footer from './Footer';
import Header from './Header';


/**
 * Template for a standard page on the site.
 */
export default class PageTemplate extends Component {

  render(props) {
    const path = props.request ? props.request.path : '';
    return (
      <div class="pageContainer" data-path={path}>
        <Header headerTexture={props.headerTexture}/>
        <div class="mainContent contentContainer">
          <div class="leftGutter sideNavigation">
            <h1 class="desktopOnly">&nbsp;</h1>
            <div class="navigationContainer desktopOnly">
              {props.sideNavigation}
            </div>
          </div>
          <article>
            {props.children}
            <Footer/>
          </article>
          <div class="rightGutter"/>
        </div>
      </div>
    );
  }

}
