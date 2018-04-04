import { Component, h } from 'preact'; // jshint ignore:line
import APICard from './APICard';


/**
 * Documentation text for an element or mixin.
 */
export default class DocumentationSection extends Component {

  render(props) {
    if (!props.documentation) {
      return (<div></div>);
    }
    
    const json = props.documentation;
    const apiHeader = json[0];
    const name = apiHeader.name;

    //
    // "Mixes" section
    //
    const mixins = apiHeader.mixes;
    const mixesJSX = mixins && mixins.length > 0 ?
      (
        <p>
          This element uses {delimitedLinkList(mixins)}.
        </p>
      ) :
      null;
    
    //
    // Mixin "used by" section
    //
    const mixinUsedBy = apiHeader.mixinUsedBy;
    const mixinUsedByJSX = mixinUsedBy ?
      (
        <p>
          {name} is used by {delimitedLinkList(mixinUsedBy)}.
        </p>
      ) :
      null;
    
    //
    // "InheritsFrom" section
    //
    let inheritsFromJSX;
    const inheritsHTMLElementOnly = apiHeader.customTags && 
      apiHeader.customTags.length > 0 && 
      apiHeader.customTags[0].tag === 'inherits' && 
      apiHeader.customTags[0].value === 'HTMLElement';
    if (apiHeader.inheritance || inheritsHTMLElementOnly) {
      let inheritance = apiHeader.inheritance || [];
      const inheritanceJSX = inheritance.map((baseClassName, index) => (
        <span>
          {' → '}
          <a href={baseClassName}>{baseClassName}</a>
        </span>
      ));
      inheritsFromJSX = (
        <p>
          Ancestry: {name}{inheritanceJSX} → HTMLElement
        </p>
      );
    }

    //
    // "InheritedBy" section
    //
    const inheritedBy = apiHeader.classInheritedBy;
    const classInheritedByJSX = inheritedBy ?
      (
        <p>
          {name} is extended by {delimitedLinkList(inheritedBy)}.
        </p>
      ) :
      null;

    //
    // Element "used by" section
    //
    const elementUsedBy = apiHeader.elementUsedBy;
    const elementUsedByJSX = elementUsedBy ?
      elementUsedByJSX = (
        <p>
          {name} is used as a subelement in {delimitedLinkList(elementUsedBy)}.
        </p>
      ) :
      null;
    
    //
    // API members
    //
    const apiElements = json.map(memberApi => {
      // Only show members that are not anonymous and have a description.
      return memberApi.memberof !== '<anonymous>' && memberApi.description ?
        (<APICard api={memberApi}></APICard>) :
        null ;
    });
  
    return (apiElements.length > 0 
          || inheritsFromJSX 
          || classInheritedByJSX 
          || mixesJSX 
          || mixinUsedByJSX) ?
      (
        <section class="apiSection">
          <div class="apiBackground"/>
          <h1>API</h1>
          <div style="margin-bottom: 40px">
            {inheritsFromJSX}
            {classInheritedByJSX}
            {mixesJSX}
            {mixinUsedByJSX}
            {elementUsedByJSX}
          </div>
          {apiElements}
        </section>
      ) :
      null;
  }

}


function delimitedLinkList(items) {
  return items.map((item, index) => (
    <span>
      { items.length > 2 && index > 0 && ', ' }
      { items.length > 1 && index === items.length -1 && ' and '}
      <a href={item}>{item}</a>
    </span>
  ));
}
