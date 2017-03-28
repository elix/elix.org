import { Component, h } from 'preact'; // jshint ignore:line
// import Header from './Header';


/**
 * Template for a standard page on the site.
 */
export default class PageTemplate extends Component {

  render(props) {
    return (
      <div class="pageContainer">
        <div class="gutter"></div>
        <article>
          <div>
            {props.children}
          </div>
          <footer>
            © 2017 Elix project
          </footer>
        </article>
        <div class="gutter"></div>
      </div>
    );
  }

}
