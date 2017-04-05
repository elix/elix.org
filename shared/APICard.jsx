import { Component, h } from 'preact'; // jshint ignore:line


/**
 * API member, property, or event description for an element or mixin.
 */
export default class APICard extends Component {

  render(props) {
    const api = props.api;

    return (
      <div>
        <p>{api.name}</p>
        <p>{api.description}</p>
      </div>
    );
  }

}
