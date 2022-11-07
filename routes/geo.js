const express = require('express');

const geoController = require('../controller/geocoding');

const router = express.Router();


router.get('/:keyword', geoController.getGeo);

module.exports = router;
