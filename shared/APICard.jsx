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
    const cardFunction = cardForKind[props.api.kind];
    return cardFunction && cardFunction(props);
  }

}


// Template shared by all API card types.
function CardTemplate(props) {

  const {
    children,
    api,
    heading,
    objectName
  } = props;
  const {
    description,
    inheritedfrom,
    memberof,
    name,
    originalmemberof
  } = api;
  
  let definedBy = null;
  if (originalmemberof && originalmemberof !== objectName) {
    if (originalmemberof !== memberof 
        && inheritedfrom 
        && inheritedfrom !== originalmemberof 
        && inheritedfrom !== memberof) {
      definedBy = (
        <p>
          Defined by{' '}
          <a href={originalmemberof}>{originalmemberof}</a>
          {' '}inherited from{' '}
          <a href={inheritedfrom}>{inheritedfrom}</a>
        </p>
      );
    } else if (inheritedfrom !== memberof) {
      definedBy = (
        <p>
          Inherited from{' '}
          <a href={originalmemberof}>{originalmemberof}</a>
        </p>
      );
    } else {
      definedBy = (
        <p>
          Defined by{' '}
          <a href={originalmemberof}>{originalmemberof}</a>
        </p>
      );
    }
  }

  return (
    <div class="apiCard">
      <a name={name}><h3>{heading}</h3></a>
      <Markdown class="apiDescription" markdown={description}/>
      {children}
      {definedBy}
    </div>
  );
}


function EventCard(props) {
  const heading = (
    <span>
      {props.api.name}
      <span class="apiMemberType"> event</span>
    </span>
  );
  return (
    <CardTemplate {...props} heading={heading}/>
  );
}


function MethodCard(props) {

  const api = props.api;
	
  // Build the heading's parameter list.
  const params = api.params || [];
  const headingParameters = params.map((param, index) =>
    // The conditionalized code handles comma placements in the string.
    `${param.name}${ (index+1) < params.length ? ', ' : '' }`
  );

  const prependStatic = api.scope && api.scope === 'static' ? 'static' : '';
  const heading = (
    <span>
      {api.name}
      ({headingParameters})
      <span class="apiMemberType"> {prependStatic} method</span>
    </span>
  );

  // "Returns" section
  const returnType = api.returns && api.returns.length > 0 &&
    api.returns[0].type.names[0];
  const returns = returnType && (
    <p>
      <span class="apiLabel">Returns: </span>
      <code>{returnType}</code>
      &nbsp;{api.returns[0].description}
    </p>
  );

  return (
    <CardTemplate {...props} heading={heading}>
      {returns}
      <MethodParameterList params={api.params}/>
    </CardTemplate>
  );
}


function MethodParameterList(props) {

  const params = props.params;
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

  const api = props.api;
  const heading = (
    <span>
      {api.name}
      <span class="apiMemberType"> property</span>
    </span>
  );

  const defaultValue = api.defaultvalue && (
    <p>
      <span class="apiLabel">Default:</span> <code>{api.defaultvalue}</code>
    </p>
  );
  
  let formattedType;
  
  if (api.type && api.type.names && api.type.names.length > 0) {
    const names = api.type.names;
    const types = names.map((name, index) => 
      // The conditionalized code handles comma placements in the string.
      `${name}${ (index+1) < names.length ? ', ' : '' }`
    );
    formattedType = (<p>
    <span class="apiLabel">Type:</span> <code>{(types)}</code>
    </p>);
  }

  return (
    <CardTemplate {...props} heading={heading}>
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

  const api = props.api;
  const heading = (
    <span>
      {api.name}
      <span class="apiMemberType"> constant</span>
    </span>
  );

  const defaultValue = api.defaultvalue && (
    <p>
      <span class="apiLabel">Default:</span> <code>{api.defaultvalue}</code>
    </p>
  );

  const type = api.type && api.type.names && api.type.names[0];
  const formattedType = type && (<p>
    <span class="apiLabel">Type:</span> <code>{type}</code>
  </p>);

  return (
    <CardTemplate {...props} heading={heading}>
      {formattedType}
      {defaultValue}
    </CardTemplate>
  );
}
