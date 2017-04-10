import { Component, h } from 'preact'; // jshint ignore:line
import Markdown from './Markdown';
import ParameterTable from './ParameterTable';


/**
 * API member, property, or event description for an element or mixin.
 */
export default class APICard extends Component {

  render(props) {
    const api = props.api;

    // Initialize
    const apiName = api.name;
    let returnsJSX = '';
    let defaultValueJSX = '';

    // The API member kind (event, method, etc.) determines the heading.
    const headingsForKind = {
      'function': methodHeading,
      'event': eventHeading,
      'member': propertyHeading
    };
    const headingFunction = headingsForKind[api.kind];
    const apiHeading = headingFunction && headingFunction(api);

    if (api.defaultvalue !== undefined) {
      defaultValueJSX = (
        <p>
          <strong>Default:</strong> <code>{api.defaultvalue}</code>
        </p>
      );
    }

    //
    // "Defined by" section
    //
    const definedBy = api.originalmemberof;
    const definedByJSX = definedBy !== undefined ?
      (<p>Defined by <a href={definedBy}>{definedBy}</a></p>) :
      '';

    //
    // "Returns" section
    //
    let returnType = '';
    if (api.returns !== undefined && api.returns.length > 0) {
      returnType = getReturnType(api);
      returnsJSX = (
        <p>
          <strong>Returns:</strong> <code>{returnType}</code> &#8212; {api.returns[0].description}
        </p>
      );
    }

    //
    // The final API card JSX
    //
    return (
      <div class="apiCard">
        <a name={apiName}><h3>{apiHeading}</h3></a>
        <Markdown class="apiDescription" markdown={api.description}/>
        {definedByJSX}
        {defaultValueJSX}
        {returnsJSX}
        <ParameterTable parameters={api.params}/>
      </div>
    );
  }

}


function eventHeading(api) {
  return (
    <span>
      {api.name}
      <span class="apiMemberType"> event</span>
    </span>
  );
}

function methodHeading(api) {
  //
  // We format the api with a type following a colon if a type
  // is specified
  //
  // if (api.type && api.type.names && api.type.names.length) {
  //   apiHeading = `${apiName} : ${api.type.names[0]}`;
  // }

  // Build the parameter list.
  const params = api.params || [];
  const parameterList = params.map((param, index) =>
    // The conditionalized code handles comma placements in the string.
    `${param.name}${ (index+1) < params.length ? ', ' : '' }`
  );

  return (
    <span>
      {api.name}
      ({parameterList})
      <span class="apiMemberType"> method</span>
    </span>
  );
}

function getReturnType(api) {
  return api.returns && api.returns.length > 0 ?
    api.returns[0].type.names[0] :
    null;
}

function propertyHeading(api) {
  return (
    <span>
      {api.name}
      <span class="apiMemberType"> property</span>
    </span>
  );
}
