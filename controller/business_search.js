const axios = require('axios');

exports.getBusiness = (req, res)=>{
    const query_params = req.query;
    query_params['limit'] = 10;
    const result = {};

    axios.get('https://api.yelp.com/v3/businesses/search', {
        params: query_params,
        headers: {"Authorization": "Bearer V1KYODRPenQG5LQesVBBilqeev1YozUcMP6tO52GixN1yy53yIey5DPoJf20L7iNlaBVMwbn2PfHGOF__F1nYJw4rPES9dwgLdfL4t4S1Fmc7EsbRazKJ0YQIy8xY3Yx"},
    })
    .then(function (response) {
        result['error'] = false;
        const final = [];
        for (let business of response.data['businesses']) {
            const each = {};
            each['id'] = business['id'];
            each['image_url'] = business['image_url'];
            each['name'] = business['name'];
            each['rating'] = business['rating'];
            each['distance'] = business['distance'];
            final.push(each);
        }
        result['content'] = final;
    })
    .catch(function (error) {
        result['error'] = true;
        result['content'] = error;
    })
    .then(function () {
        res.status(200).json(result);
    });
}
