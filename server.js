'use strict';

const express = require('express');
const app = express();

app.use('/static', express.static('public'));

var path = require("path");
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

// static content
app.use(express.static(path.join(__dirname, "./static")));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
  // res.render('index');
});

const server = app.listen(8000, () => {
  let port = server.address().port;
  console.log(`Server running at http://localhost:${port}`);
});