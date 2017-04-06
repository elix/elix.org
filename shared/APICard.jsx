import { Component, h } from 'preact'; // jshint ignore:line
import Markdown from './Markdown';


/**
 * API member, property, or event description for an element or mixin.
 */
export default class APICard extends Component {

  render(props) {
    const api = props.api;

    let apiName = api.name;
    if (api.kind === 'function') {
      apiName = `${apiName}()`;
    }
    if (api.type && api.type.names && api.type.names.length) {
      apiName = `${apiName} : ${api.type.names[0]}`;
    }

    const definedBy = api.originalmemberof;
    const definedByJSX = definedBy !== undefined ?
      (<p>Defined by <a href={definedBy}>{definedBy}</a></p>) :
      '';

    return (
      <div class="apiCard">
        <h3>{apiName}</h3>
        <Markdown class="apiDescription" markdown={api.description}/>
        {definedByJSX}
      </div>
    );
  }

}
