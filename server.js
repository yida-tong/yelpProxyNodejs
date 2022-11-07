const express = require('express');
const path = require("path");

const yelpRoute = require('./routes/yelp');
const geoRoute = require('./routes/geo');

const app = express();
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next)=> {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET');
    res.setHeader('Access-Control-Allow-Headers', '*');
    next();
});

app.use('/yelp', yelpRoute);
app.use('/geo', geoRoute);

const PORT = process.env.PORT || 3000;
app.listen(PORT);
