'use strict';

let mainTemplate = require('./mainTemplate');

module.exports = (request) => {
  let html = `
    <style>
    /*
    * Home
    */

    .intro.home h1 {
      color: white;
    }

    .intro.home p {
      color: red;
    }

    a.introButton {
      background-color: rgba(128, 128, 128, 0.5);
      border-radius: 6px;
      border: 1px solid #76a3bf;
      color: white;
      font-family: "Ubuntu", Arial, "Helvetica Neue", Helvetica, sans-serif;
      font-size: 18px;
      margin-bottom: 10px;
      padding: 4px 30px;
      text-decoration: none;
    }
    .introButton + .introButton {
      margin-left: 8px;
    }

    a.introButton:hover {
      background-color: rgba(255, 255, 255, 0.3);
    }
    a.introButton:active {
      background-color: rgba(0, 0, 0, 0.2);
    }

    /* Desktop home */
    @media screen and (min-width: 800px) {
      .intro.home h1 {
        font-size: 60px;
      }
      .intro.home p {
        margin-left: 200px;
      }
    }
    </style>
    <div class="bleed intro home">
      <div>
        <h1>Elix</h1>
        <p>
          All about Elix
        </p>
        <p>
          <a class="introButton" href="/about">About us</a>
        </p>
      </div>
    </div>
  `;
  return mainTemplate(request, {
    head: ``,
    title: `Home`,
    content: html
  });
};
