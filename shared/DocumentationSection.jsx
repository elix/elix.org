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
    
    const objectDocs = props.documentation;
    const objectDoclet = objectDocs[0];
    const name = objectDoclet.name;
    
    //
    // "InheritsFrom" section
    //
    let inheritsFromJSX;
    const inheritsHTMLElementOnly = objectDoclet.customTags && 
      objectDoclet.customTags.length > 0 && 
      objectDoclet.customTags[0].tag === 'inherits' && 
      objectDoclet.customTags[0].value === 'HTMLElement';
    if (objectDoclet.inheritance || inheritsHTMLElementOnly) {
      let inheritance = objectDoclet.inheritance || [];
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
    const inheritedBy = objectDoclet.classInheritedBy;
    const classInheritedByJSX = inheritedBy ?
      (
        <p>
          Extended by {delimitedLinkList(inheritedBy)}.
        </p>
      ) :
      null;

    //
    // "Mixes" section
    //
    const mixins = objectDoclet.mixes;
    const mixesJSX = mixins && mixins.length > 0 ?
      (
        <p>
          Built with mixins {delimitedLinkList(mixins)}.
        </p>
      ) :
      null;
    
    //
    // Mixin "used by" section
    //
    const mixinUsedBy = objectDoclet.mixinUsedBy;
    const mixinUsedByJSX = mixinUsedBy ?
      (
        <p>
          Used by classes {delimitedLinkList(mixinUsedBy)}.
        </p>
      ) :
      null;

    //
    // Element "used by" section
    //
    const elementUsedBy = objectDoclet.elementUsedBy;
    const elementUsedByJSX = elementUsedBy ?
      (
        <p>
          Included as a subelement in {delimitedLinkList(elementUsedBy)}.
        </p>
      ) :
      null;

    //
    // Element tags section
    //
    const elementTags = objectDoclet.elementTags;
    const subelements = elementTags && Object.values(elementTags)
    const elementTagsJSX = subelements && subelements.length > 0 ?
      (
        <p>
          Includes subelement{subelements.length > 1 && 's'} {delimitedLinkList(subelements)}.
        </p>
      ) :
      null;
    
    //
    // API members
    //
    const apiElements = objectDocs.map(memberApi => {
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
            {elementTagsJSX}
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
