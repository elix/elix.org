import { h } from 'preact'; // jshint ignore:line


/**
 * Top navigation links
 */
export default (props) => (
  <header>
    <div class="gutter"></div>
    <img src="/static/resources/images/elix.png"/>
    <div class="headerLinks">
      <a id="linkAbout" href="/">HOME</a> /&nbsp;
      <a id="linkAbout" href="/elements">ELEMENTS</a> /&nbsp;
      <a id="linkAbout" href="/mixins">MIXINS</a> /&nbsp;
      <a id="linkAbout" href="/gold-standard">GOLD STANDARD</a> /&nbsp;
      <a id="linkAbout" href="https://github.com/elix/elix">GITHUB</a>&nbsp;
    </div>
    <div class="gutter"></div>
  </header>
);
