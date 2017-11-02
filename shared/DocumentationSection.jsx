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
    
    const apiElements = json.map(memberApi => {
      // Only show members that are not anonymous and have a description.
      return memberApi.memberof !== '<anonymous>' && memberApi.description ?
        (<APICard api={memberApi}></APICard>) :
        null ;
    });

    //
    // "Mixes" section
    //
    let mixesJSX;
    const mixins = apiHeader.mixes;
    if (mixins) {
      const mixinsJSX = mixins.map((mixin, index) => (
        <span>
          { mixins.length > 2 && index > 0 && ', ' }
          { mixins.length > 1 && index === mixins.length -1 && ' and '}
          <a href={mixin}>{mixin}</a>
        </span>
      ));
      mixesJSX = (
        <p>
          This element uses {mixinsJSX}.
        </p>
      );
    }
    
    //
    // "UsedBy" section
    //
    let mixinUsedByJSX;
    const usedBy = apiHeader.mixinUsedBy;
    if (usedBy) {
      const usedByJSX = usedBy.map((item, index) => (
        <span>
          { usedBy.length > 2 && index > 0 && ', ' }
          { usedBy.length > 1 && index === usedBy.length -1 && ' and '}
          <a href={item}>{item}</a>
        </span>
      ));
      mixinUsedByJSX = (
        <p>
          {apiHeader.name} is used by {usedByJSX}.
        </p>
      );
    }
    
    //
    // "InheritsFrom" section
    //
    let inheritsFromJSX;
    const inheritsHTMLElementOnly = apiHeader.augments && apiHeader.augments.includes('HTMLElement');
    if (apiHeader.inheritance || inheritsHTMLElementOnly) {
      let inheritance;
      if (apiHeader.inheritance) {
        inheritance = [apiHeader.name].concat(apiHeader.inheritance);
      }
      else {
        inheritance = [apiHeader.name];
      }
      const inheritanceJSX = inheritance.map((item, index) => (
        <span>
          { index > 0 && ' → '}
          <a href={item}>{item}</a>
        </span>
      ));
      inheritsFromJSX = (
        <p>
          Ancestry: {inheritanceJSX} <span> → HTMLElement</span>
        </p>
      );
    }

    //
    // "InheritedBy" section
    //
    let classInheritedByJSX;
    const inheritedBy = apiHeader.classInheritedBy;
    if (inheritedBy) {
      const inheritedJSX = inheritedBy.map((item, index) => (
        <span>
          { inheritedBy.length > 2 && index > 0 && ', ' }
          { inheritedBy.length > 1 && index === inheritedBy.length -1 && ' and '}
          <a href={item}>{item}</a>
        </span>
      ));
      classInheritedByJSX = (
        <p>
          {apiHeader.name} is extended by {inheritedJSX}.
        </p>
      );
    }

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
          </div>
          {apiElements}
        </section>
      ) :
      null;
  }

}
