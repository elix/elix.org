'use strict';

// Note: the social icons have fixed widths. This is for IE/Edge, which is too
// stupid to properly size SVG elements to their instrinc width.
// See http://thatemil.com/blog/2014/04/06/intrinsic-sizing-of-svg-in-responsive-web-design/
module.exports = () => `
  <nav id="header">
    <a href="/">
      <span>Logo goes here</span>
    </a>
    <div id="headerSpace"></div>
    <div id="headerLinks">
    </div>
  </nav>
`;
