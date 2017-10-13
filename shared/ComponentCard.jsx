import { Component, h } from 'preact'; // jshint ignore:line


/**
 * A small card for a project web component.
 */
export default class ComponentCard extends Component {

  render(props) {
    const staticPath = `/static/${props.request.app.locals.build}`;
    const color = props.color || 0;
    const className = `componentCard cardColor${color}`;
    return (
      <a class={className} href={`/documentation/${props.name}`}>
        <div class="cardPreviewContainer">
          <img class="cardPreview" src={`${staticPath}/previews/${props.name}.png`}/>
        </div>
        <div class="cardDetails">
          <div class="cardName">{props.name}</div>
          <div>{props.children}</div>
        </div>
      </a>
    );
  }

}
