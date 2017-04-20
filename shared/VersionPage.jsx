import { Component, h } from 'preact'; // jshint ignore:line
import PageTemplate from './PageTemplate';


/**
 * The Version page.
 *
 */
export default class VersionPage extends Component {

  render(props) {

    return (
      <PageTemplate
          headerTexture="/static/images/homeTexture.png"
          request={props.request}
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
