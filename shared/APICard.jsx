import { Component, h } from 'preact'; // jshint ignore:line
import Markdown from './Markdown';


/**
 * API member, property, or event description for an element or mixin.
 */
export default class APICard extends Component {

  render(props) {
    // The API member kind (event, method, etc.) determines the card type.
    const cardForKind = {
      'constant': ConstantCard,
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

  const memberof = props.memberof;
  const originalmemberof = props.originalmemberof;
  const inheritedfrom = props.inheritedfrom;
  
  let definedBy = null;
  
  if (originalmemberof 
      && originalmemberof !== memberof 
      && inheritedfrom 
      && inheritedfrom !== originalmemberof 
      && inheritedfrom !== memberof) {
    definedBy = (
      <p>
        Defined by <a href={originalmemberof}>{originalmemberof}</a> inherited from <a href={inheritedfrom}>{inheritedfrom}</a>
      </p>);
  }
  else if (originalmemberof && inheritedfrom !== memberof) {
    definedBy = (<p>Inherited from <a href={originalmemberof}>{originalmemberof}</a></p>);
  }
  else if (originalmemberof) {
    definedBy = (<p>Defined by <a href={originalmemberof}>{originalmemberof}</a></p>);
  }

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
      memberof={props.memberof}
      originalmemberof={props.originalmemberof}
      inheritedfrom={props.inheritedfrom}
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

  const prependStatic = props.scope && props.scope === 'static' ? 'static' : '';
  const heading = (
    <span>
      {props.name}
      ({headingParameters})
      <span class="apiMemberType"> {prependStatic} method</span>
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
      memberof={props.memberof}
      originalmemberof={props.originalmemberof}
      inheritedfrom={props.inheritedfrom}
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
  
  let formattedType;
  
  if (props.type && props.type.names && props.type.names.length > 0) {
    const names = props.type.names;
    const types = names.map((name, index) => 
      // The conditionalized code handles comma placements in the string.
      `${name}${ (index+1) < names.length ? ', ' : '' }`
    );
    formattedType = (<p>
    <span class="apiLabel">Type:</span> <code>{(types)}</code>
    </p>);
  }

  return (
    <CardTemplate
      description={props.description}
      heading={heading}
      name={props.name}
      memberof={props.memberof}
      originalmemberof={props.originalmemberof}
      inheritedfrom={props.inheritedfrom}
      >
      {formattedType}
      {defaultValue}
    </CardTemplate>
  );
}

//
// ConstantCard is nearly identical to PropertyCard, but we
// keep them separated for now should we want further distinction in
// the display between the two. If we decide the two cards should look
// near-identical, we can parameterize PropertyCard to handle both cases.
//
function ConstantCard(props) {

  const heading = (
    <span>
      {props.name}
      <span class="apiMemberType"> constant</span>
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
      memberof={props.memberof}
      originalmemberof={props.originalmemberof}
      inheritedfrom={props.inheritedfrom}
      >
      {formattedType}
      {defaultValue}
    </CardTemplate>
  );
}
