/*
 * Kick off the Elix.org server.
 */

var path = require('path');
var clientFolder = path.join(__dirname, 'public');

// Start web server, which will start the publisher upon database connection
var webServer = require('./server/webServer.js');
webServer.clientFolder = clientFolder;
webServer.listen();
