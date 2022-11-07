const axios = require('axios');

exports.getGeo = (req, res)=>{
    const keyword = req.params['keyword'];
    const result = {};

    axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
        params: {'address': keyword, 'key': 'AIzaSyDBqxxvoDy8IxRgSyTzLoAv7Rs_bFFeRb4'},
    })
    .then(function (response) {
        result['error'] = false;
        result['content'] = {
            latitude: response.data.results[0].geometry.location.lat,
            longitude: response.data.results[0].geometry.location.lng
        };
    })
    .catch(function (error) {
        result['error'] = true;
        result['content'] = error;
    })
    .then(function () {
        res.status(200).json(result);
    });
}
