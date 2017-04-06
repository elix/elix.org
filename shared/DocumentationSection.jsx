import { Component, h } from 'preact'; // jshint ignore:line
import APICard from './APICard';


/**
 * Documentation text for an element or mixin.
 */
export default class DocumentationSection extends Component {

  render(props) {
    const json = props.documentation;
    let apiElements = [];

    for (let i = 1; i < json.length; i++) {
      let jsonItem = json[i];
      apiElements.push(<APICard api={jsonItem}></APICard>);
    }

    return apiElements.length > 0 ?
      (
        <section class="apiSection">
          <h1>API</h1>
          {apiElements}
        </section>
      ) :
      null;
  }

}
