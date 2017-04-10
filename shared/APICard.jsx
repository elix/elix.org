import { Component, h } from 'preact'; // jshint ignore:line
import Markdown from './Markdown';


/**
 * API member, property, or event description for an element or mixin.
 */
export default class APICard extends Component {

  render(props) {
    // The API member kind (event, method, etc.) determines the card type.
    const cardForKind = {
      'function': MethodCard,
      'event': EventCard,
      'member': PropertyCard
    };
    const api = props.api;
    const cardFunction = cardForKind[api.kind];
    return cardFunction && cardFunction(api);
  }

}


// Template shared by all API card types.
function CardTemplate(props) {

  const originalmemberof = props.originalmemberof;
  const definedBy = originalmemberof &&
    (<p>Defined by <a href={originalmemberof}>{originalmemberof}</a></p>);

  return (
    <div class="apiCard">
      <a name={props.name}><h3>{props.heading}</h3></a>
      <Markdown class="apiDescription" markdown={props.description}/>
      {props.children}
      {definedBy}
    </div>
  );
}


function EventCard(props) {
  const heading = (
    <span>
      {props.name}
      <span class="apiMemberType"> event</span>
    </span>
  );

  return (
    <CardTemplate
      description={props.description}
      heading={heading}
      name={props.name}
      >
    </CardTemplate>
  );
}


function MethodCard(props) {

  // Build the heading's parameter list.
  const params = props.params || [];
  const headingParameters = params.map((param, index) =>
    // The conditionalized code handles comma placements in the string.
    `${param.name}${ (index+1) < params.length ? ', ' : '' }`
  );

  const heading = (
    <span>
      {props.name}
      ({headingParameters})
      <span class="apiMemberType"> method</span>
    </span>
  );

  // "Returns" section
  const returnType = props.returns && props.returns.length > 0 &&
    props.returns[0].type.names[0];
  const returns = returnType && (
    <p>
      <span class="apiLabel">Returns: </span>
      <code>{returnType}</code>
      &nbsp;{props.returns[0].description}
    </p>
  );

  return (
    <CardTemplate
      description={props.description}
      heading={heading}
      name={props.name}
      >
      {returns}
      <MethodParameterList parameters={props.params}/>
    </CardTemplate>
  );
}


function MethodParameterList(props) {

  const params = props.parameters;
  if (!params || params.length === 0) {
    return '';
  }

  const parameterItems = params.map(param => {
    const type = param.type && param.type.names[0] ;
    const formattedType = type && (<span><code>{type}</code> – </span>);
    return (
      <li>
        {param.name}: {formattedType}{param.description}
      </li>
    );
  });

  return (
    <p>
      <div class="apiLabel">Parameters:</div>
      <ul>
        {parameterItems}
      </ul>
    </p>
  );
}


function PropertyCard(props) {

  const heading = (
    <span>
      {props.name}
      <span class="apiMemberType"> property</span>
    </span>
  );

  const defaultValue = props.defaultvalue && (
    <p>
      <span class="apiLabel">Default:</span> <code>{props.defaultvalue}</code>
    </p>
  );

  const type = props.type && props.type.names && props.type.names[0];
  const formattedType = type && (<p>
    <span class="apiLabel">Type:</span> <code>{type}</code>
  </p>);

  return (
    <CardTemplate
      description={props.description}
      heading={heading}
      name={props.name}
      >
      {formattedType}
      {defaultValue}
    </CardTemplate>
  );
}
