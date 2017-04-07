import { Component, h } from 'preact'; // jshint ignore:line
import Markdown from './Markdown';


/**
 * API member, property, or event description for an element or mixin.
 */
export default class APICard extends Component {

  render(props) {
    const api = props.api;
    const params = api.params;
    
    // Hold the parameter table rows
    let rowArray = [];
    
    //
    // Set to false if any of the parameters lacks a type field.
    // This results in a table with two rather than three columns.
    //
    let useTypeColumn = true;
    
    // Set to true if we display the parameter table for this APICard
    let useParameterTable = false;

    // Initialize the apiName variable
    let apiName = api.name;
    
    //
    // If this api is a function/member, we build a parameter list
    // for display with the api (eg: foo(param1, param2) ), and
    // we build a parameter table. If there are no parameters, we
    // do neither.
    //
    let parameterList = '';
    if (api.kind === 'function' && params.length > 0) {
      for (let i = 0; i < params.length; i++) {
        let param = params[i];
        
        // Build the parameter list for use in the api name display. The
        // funky conditionalized code handles comma placements in the string.
        parameterList = `${parameterList}${param.name}${(i+1) < params.length ? ', ' : ''}`;

        //
        // Build the function/member parameter table
        //
        let row;        
        if (param.type && useTypeColumn) {
          row = (
            <tr>
              <td>{param.name}</td>
              <td><code>{param.type.names[0]}</code></td>
              <td>{param.description}</td>
            </tr>
          );
        }
        else {
          useTypeColumn = false;
          
          row = (
            <tr>
              <td>{param.name}</td>
              <td>{param.description}</td>
            </tr>
          );
        }

        rowArray.push(row);
      }
      
      useParameterTable = true;
      apiName = `${apiName}(${parameterList})`;
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
    // Finish up the table with its parts
    //
    const tHeader = (
      <thead>
        <tr>
          <th>Param</th>
          <th>Type</th>
          <th>Description</th>
        </tr>
      </thead>
    );
    const tHeaderWithoutType = (
      <thead>
        <tr>
          <th>Param</th>
          <th>Description</th>
        </tr>
      </thead>
    );
    let tableBodyJSX = (
      <tbody>
        {rowArray}
      </tbody>
    );
    let tableHeaderJSX = useTypeColumn ? tHeader : tHeaderWithoutType;
    let tableJSX = useParameterTable ? (
      <table>
        {tableHeaderJSX}
        {tableBodyJSX}
      </table>
    ) : '';

    //
    // The final API card JSX
    //
    return (
      <div class="apiCard">
        <h3>{apiName}</h3>
        <Markdown class="apiDescription" markdown={api.description}/>
        {definedByJSX}
        {tableJSX}
      </div>
    );
  }

}
