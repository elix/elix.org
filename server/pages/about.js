'use strict';

let mainTemplate = require('./mainTemplate');

module.exports = (request) => {
  let html = `
    <style>
    .title {
      color: #194e70;
    }

    /* Desktop */
    @media screen and (min-width: 800px) {
      .details {
        display: -webkit-flex;
        display: flex;
      }

      .nameAndTitle {
        -webkit-flex: 1;
        flex: 1;
      }
    }
    </style>
    <h1>About us</h1>
  `;
  return mainTemplate(request, {
    title: `About`,
    content: html
  });
};
