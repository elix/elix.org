import { Component, h } from 'preact'; // jshint ignore:line
import Markdown from './Markdown';
import ParameterTable from './ParameterTable';


/**
 * API member, property, or event description for an element or mixin.
 */
export default class APICard extends Component {

  render(props) {
    const api = props.api;
    const params = api.params;
    
    // Initialize
    let apiName = api.name;
    let returnsJSX = '';
    let defaultValueJSX = '';
    
    //
    // If this api is a function/member, we build a parameter list
    // for display with the api (eg: foo(param1, param2) ).
    //
    let parameterList = '';
    if (api.kind === 'function') {
      if (params.length > 0) {
        for (let i = 0; i < params.length; i++) {
          let param = params[i];
          
          // Build the parameter list for use in the api name display. The
          // funky conditionalized code handles comma placements in the string.
          parameterList = `${parameterList}${param.name}${(i+1) < params.length ? ', ' : ''}`;
        }
      }
      
      let returnValString = '';
      let returnType = '';
      if (api.returns !== undefined && api.returns.length > 0) {
        returnType = api.returns[0].type.names[0];
        returnValString = ` ⇒ ${returnType}`;
        returnsJSX = (
          <p>
            <strong>Returns:</strong> <code>{returnType}</code> &#8212; {api.returns[0].description}
          </p>
        );
      }

      apiName = `${apiName}(${parameterList})${returnValString}`;
    }
    
    if (api.defaultvalue !== undefined) {
      defaultValueJSX = (
        <p>
          <strong>Default:</strong> <code>{api.defaultvalue}</code>
        </p>
      );
    }
    
    //
    // We format the api with a type following a colon if a type
    // is specified
    //
    if (api.type && api.type.names && api.type.names.length) {
      apiName = `${apiName} : ${api.type.names[0]}`;
    }

    //
    // Handle the "definedBy" section
    //
    const definedBy = api.originalmemberof;
    const definedByJSX = definedBy !== undefined ?
      (<p>Defined by <a href={definedBy}>{definedBy}</a></p>) :
      '';
    
    //
    // The final API card JSX
    //
    return (
      <div class="apiCard">
        <h3>{apiName}</h3>
        <Markdown class="apiDescription" markdown={api.description}/>
        {definedByJSX}
        {defaultValueJSX}
        {returnsJSX}
        <ParameterTable parameters={params}/>
      </div>
    );
  }

}
