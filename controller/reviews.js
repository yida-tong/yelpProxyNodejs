const axios = require('axios');

exports.getReview = (req, res)=>{
    const id = req.params['id'];
    const result = {};

    axios.get(`https://api.yelp.com/v3/businesses/${id}/reviews`, {
        headers: {"Authorization": "Bearer V1KYODRPenQG5LQesVBBilqeev1YozUcMP6tO52GixN1yy53yIey5DPoJf20L7iNlaBVMwbn2PfHGOF__F1nYJw4rPES9dwgLdfL4t4S1Fmc7EsbRazKJ0YQIy8xY3Yx"},
    })
    .then(function (response) {
        result['error'] = false;
        const final = [];
        for (let review of response.data['reviews']) {
            const each = {};
            each['rating'] = review['rating']+'/5';
            each['user'] = review['user']['name'];
            each['text'] = review['text'];
            each['time_created'] = review['time_created'].substring(0, 10);
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
