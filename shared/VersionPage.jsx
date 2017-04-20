import { Component, h } from 'preact'; // jshint ignore:line
import PageTemplate from './PageTemplate';


/**
 * The Version page.
 *
 */
export default class VersionPage extends Component {

  render(props) {

    const sideNavigation = (
      <nav>
        <ul>
          <li><a href="#components">Components</a></li>
          <li><a href="#overview">Overview</a></li>
          <li><a href="#core-principles">Core Principles</a></li>
          {/*<li><a href="#getting-started">Getting Started</a></li>*/}
        </ul>
      </nav>
    );

    return (
      <PageTemplate
          headerTexture="/static/images/homeTexture.png"
          request={props.request}
          sideNavigation={sideNavigation}
        >
        
        <section class="homeSection0">
          <p>
            Build: {props.request.app.locals.build}
          </p>
          <p>
            Version: {props.request.app.locals.version}
          </p>
        </section>

      </PageTemplate>
    );
  }

}
