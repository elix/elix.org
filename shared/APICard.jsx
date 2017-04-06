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
    
    let definedByJSX = (<p/>);
    let definedBy = api.originalmemberof;
    if (definedBy !== undefined) {
      let strings = definedBy.split(/:|~/);
      switch (strings.length) {
        case 1:
          definedBy = `${strings[0]}Mixin`;
          break;
        case 3:
          definedBy = strings[1];
          break;
        default:
          break;
      }
      
      definedByJSX = (
        <p>Defined by <a href={definedBy}>{definedBy}</a></p>
      );
    }

    return (
      <div style="margin-bottom: 10px; background-color: #f0f0f0">
        <h3>{apiName}</h3>
        <p><Markdown markdown={api.description}/></p>
        {definedByJSX}
      </div>
    );
  }

}
