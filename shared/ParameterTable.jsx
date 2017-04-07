import { Component, h } from 'preact'; // jshint ignore:line


/**
 * Builds a table element for displaying API parameters
 */
export default class ParameterTable extends Component {
  
  render(props) {
    let params = props.parameters;
    
    if (params == null || params === undefined || params.length === 0) {
      return '';
    }
    
    //
    // Set to false if any of the parameters lacks a type field.
    // This results in a table with two rather than three columns.
    //
    let useTypeColumn = true;
    
    // Hold the parameter table rows
    let rowArray = [];

    for (let i = 0; i < params.length; i++) {
      let param = params[i];
      
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
    
    return (
      <table>
        {tableHeaderJSX}
        {tableBodyJSX}
      </table>
    );

  }
}