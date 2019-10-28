'use strict';

const express = require('express');

var app = express();

app.use('/static', express.static('public'));

var path = require("path");
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// static content
app.use(express.static(path.join(__dirname, "./static")));

const yelp = require('yelp-fusion');
const client = yelp.client('2Zpt-BoHdL-XOPH12z47CG2v-xtQytuKVA8qZJfONBtcT0hCjlTInu_tjylY6i4tYLENhc80wlI56TV9sUdoauGy6NnQ074S0x8whwNovCH1ANvbM0rW7LW99UN5WXYx')

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.post('/api/yelpCall', (req, res) => {
  console.log(JSON.stringify(req.body))
  let searchLat = req.body.lat;
	let searchLong = req.body.long;		
	let searchRadius = req.body.radius;
	let searchLimit = req.body.limit;
	let searchCategories = req.body.categories;
	let searchPrice = req.body.price;
  client.search({
    term: 'restaurants',
    categories: searchCategories,
    limit: searchLimit,
    latitude: searchLat,
    longitude: searchLong,
    radius: searchRadius,
    price: searchPrice,
  })
  .then(response => {
    console.log(JSON.stringify(response))
    return res.json(response);
  })
  .catch(e => {
    return res.json(e);
  });
})

const server = app.listen(8000, () => {
  let port = server.address().port;
  console.log(`Server running at http://localhost:${port}`);
});