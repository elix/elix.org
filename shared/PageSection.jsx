import { h } from 'preact'; // jshint ignore:line


/**
 * Top navigation links
 */
export default (props) => (
  <section class={props.class}>
    <div class="sectionContainer">
      <div class="gutter"/>
      <div class="sectionContent">
        {props.children}
      </div>
      <div class="gutter"/>
    </div>
  </section>
);
