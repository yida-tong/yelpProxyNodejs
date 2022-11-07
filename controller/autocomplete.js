const axios = require('axios');

exports.getAuto = (req, res)=>{
    const keyword = req.params['keyword'];
    const result = {};

    axios.get('https://api.yelp.com/v3/autocomplete', {
        params: {text: keyword},
        headers: {"Authorization": "Bearer V1KYODRPenQG5LQesVBBilqeev1YozUcMP6tO52GixN1yy53yIey5DPoJf20L7iNlaBVMwbn2PfHGOF__F1nYJw4rPES9dwgLdfL4t4S1Fmc7EsbRazKJ0YQIy8xY3Yx"},
    })
    .then(function (response) {
        result['error'] = false;
        const final = [];
        for (let term of response.data['terms']) {
            final.push(term['text']);
        }
        for (let term of response.data['categories']) {
            final.push(term['title']);
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
