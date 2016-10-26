'use strict';

let express = require('express');
let serveStatic = require('serve-static');
let app = express();
let port = process.env.PORT || 3000;

app.use(serveStatic(__dirname + '/dist'));
app.get('*', function(req, res){
  res.sendFile('dist/index.html', { root: __dirname })
});
app.listen(port);

console.log('Running on http://localhost:' + port);
