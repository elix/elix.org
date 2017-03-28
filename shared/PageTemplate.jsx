import { Component, h } from 'preact'; // jshint ignore:line
// import Header from './Header';


/**
 * Template for a standard page on the site.
 */
export default class PageTemplate extends Component {

  render(props) {
    return (
      <article>
        {props.children}
        <footer>
          © 2017 Elix project
        </footer>
      </article>
    );
  }

}
