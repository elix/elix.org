import { Component, h } from 'preact'; // jshint ignore:line


/**
 * Top navigation links
 */
export default class Header extends Component {

  render(props) {

    const staticPath = `/static/${props.request.app.locals.build}`;
    const headerTexture = props.headerTexture ||
        `${staticPath}/images/headerTexture.png`;

    return (
      <div class="header contentContainer">
        <img class="headerBackground" src={headerTexture}/>
        <div class="leftGutter"></div>
        <header>
          <a class="logoLink" href="/">
            <img src={`${staticPath}/images/elix.png`}/>
          </a>
          <div class="headerLinks">
            <a id="linkAbout" href="/">HOME</a> &nbsp; / &nbsp;&nbsp;
            <a id="linkAbout" href="/documentation">DOCUMENTATION</a> &nbsp; / &nbsp;&nbsp;
            <a id="linkAbout" href="https://github.com/webcomponents/gold-standard/wiki">GOLD STANDARD</a> &nbsp; / &nbsp;&nbsp;
            <a id="linkAbout" href="https://github.com/elix/elix">GITHUB</a>
          </div>
        </header>
        <div class="rightGutter"></div>
      </div>
    );
  }

}
