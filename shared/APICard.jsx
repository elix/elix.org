import { Component, h } from 'preact'; // jshint ignore:line
import Markdown from './Markdown';


/**
 * API member, property, or event description for an element or mixin.
 */
export default class APICard extends Component {

  render(props) {
    const api = props.api;

    return (
      <div>
        <p>{api.name}</p>
        <p>
          <Markdown markdown={api.description}/>
        </p>
      </div>
    );
  }

}
