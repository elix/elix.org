import { Component, h } from 'preact'; // jshint ignore:line
import Markdown from './Markdown';


/**
 * API member, property, or event description for an element or mixin.
 */
export default class APICard extends Component {

  render(props) {
    const api = props.api;
    let definedBy = '';
    if (api.originalmemberof !== undefined) {
      definedBy = (
        <p>Defined by {api.originalmemberof}</p>
      );
    }

    return (
      <div>
        <p>{api.name}</p>
        <p><Markdown markdown={api.description}/></p>
        {definedBy}
      </div>
    );
  }

}
