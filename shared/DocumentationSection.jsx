import { Component, h } from 'preact'; // jshint ignore:line


/**
 * Documentation text for an element or mixin.
 */
export default class DocumentationSection extends Component {

  render(props) {
    const html = props.documentation;

    return (
      <div dangerouslySetInnerHTML={{__html: html}} />
    );
  }

}
