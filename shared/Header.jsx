import { h } from 'preact'; // jshint ignore:line


/**
 * Top navigation links
 */
export default (props) => (
  <div class="header contentContainer">
    <div class="gutter"></div>
    <header>
      <a class="logoLink" href="/">
        <img src="/static/resources/images/elix.png"/>
      </a>
      <div class="headerLinks">
        <a id="linkAbout" href="/">HOME</a> &nbsp; / &nbsp;&nbsp;
        <a id="linkAbout" href="/documentation">DOCUMENTATION</a> &nbsp; / &nbsp;&nbsp;
        <a id="linkAbout" href="/gold-standard">GOLD STANDARD</a> &nbsp; / &nbsp;&nbsp;
        <a id="linkAbout" href="https://github.com/elix/elix">GITHUB</a>
      </div>
    </header>
    <div class="gutter"></div>
  </div>
);
