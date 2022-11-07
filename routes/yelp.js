const express = require('express');

const businessController = require('../controller/business_search');
const businessDetailController = require('../controller/business_detail');
const businessReviewController = require('../controller/reviews');
const businessAutoController = require('../controller/autocomplete');

const router = express.Router();

router.get('/search', businessController.getBusiness);
router.get('/detail/:id', businessDetailController.getBusinessDetail);
router.get('/review/:id', businessReviewController.getReview);
router.get('/autocomplete/:keyword', businessAutoController.getAuto);

module.exports = router;
