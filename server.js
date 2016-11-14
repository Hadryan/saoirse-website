/* eslint-env node */

const path = require('path');
const express = require('express');
const serveStatic = require('serve-static');
const app = express();
const port = process.env.PORT || 3000;

const distFolderPath = path.join(__dirname, '/dist');

app.use(serveStatic(distFolderPath));

app.get('*', (req, res) => {
  res.sendFile('dist/index.html', { root: __dirname });
});

app.listen(port);

console.log('Running on http://localhost:' + port);
