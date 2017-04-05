import { Component, h } from 'preact'; // jshint ignore:line
import APICard from './APICard';


/**
 * Documentation text for an element or mixin.
 */
export default class DocumentationSection extends Component {

  render(props) {
    const json = props.documentation;
    const title = json[0].name;
    let apiElements = [];
    
    for (let i = 1; i < json.length; i++) {
      let api = {};
      let jsonItem = json[i];
      
      api.name = jsonItem.name;
      api.description = jsonItem.description;
      api.originalmemberof = jsonItem.originalmemberof;
      
      apiElements.push(<APICard api={api}></APICard>);
    }

    return (
      <div>
        {apiElements}
      </div>
    );
  }

}
