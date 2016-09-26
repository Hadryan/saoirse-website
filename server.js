'use strict';

let express = require('express');
let serveStatic = require('serve-static');
let app = express();
let port = process.env.PORT || 3000;

app.use(serveStatic(__dirname + '/dist'));
app.listen(port);

console.log('Running on ' + port);
