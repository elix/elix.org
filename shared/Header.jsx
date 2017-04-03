import { Component, h } from 'preact'; // jshint ignore:line


/**
 * Top navigation links
 */
export default class Header extends Component {

  render(props) {

    const headerTexture = props.headerTexture ||
        '/static/resources/images/headerTexture.png';

    return (
      <div class="header contentContainer">
        <img class="headerBackground" src={headerTexture}/>
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
  }

}
