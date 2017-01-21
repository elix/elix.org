/*
 * Version info
 *
 * This lets us check the version of the deployed site.
 */

'use strict';

let mainTemplate = require('./mainTemplate');

module.exports = (request) => {
  let html = `
    <div>
      <div>Build: ${request.app.locals.build}</div>
      <div>Version: ${request.app.locals.version}</div>
      <div id="swVersionDiv">Service Worker Version: <span id="swVersion"></span></div>
    </div>
    <script>
      function getServiceWorkerVersion() {
        var messageChannel = new MessageChannel();
        var elem = document.getElementById('swVersion');        
        messageChannel.port1.onmessage = function(event) {
          var elem = document.getElementById('swVersion');
          var versionString = event.data;
          if (versionString.indexOf('v') === 0) {
            versionString = versionString.substring(1);
          }
          elem.innerHTML = versionString;
        };
        
        if (navigator.serviceWorker.controller === undefined || navigator.serviceWorker.controller == null) {
          console.log('Service worker controller not defined, so no message sent back to client');
          return;
        }
        else {
          navigator.serviceWorker.controller.postMessage({action: 'GET_VERSION'}, [messageChannel.port2]);
        }
      }
      
      if ('serviceWorker' in navigator) {
        getServiceWorkerVersion();     
      }
      else {
        var swVersionDiv = document.getElementById('swVersionDiv');
        swVersionDiv.innerHTML = '';
      }
    </script>        
  `;

  return mainTemplate(request, {
    title: `Version`,
    content: html
  });
};
