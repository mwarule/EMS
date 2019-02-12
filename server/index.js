// Root path
global.APP_ROOT_PATH = __dirname + '/app/';
// Set other app paths
require('./config/global-paths');
// Set config variables
global.config = require('./config');

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const routes = require(APP_ROUTE_PATH);
app.use(bodyParser.json())

// Setup routes
app.use('/', routes);
app.listen(global.config.server.PORT, function () {
  console.log('App is running on ' + global.config.server.PORT);
});