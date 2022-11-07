const axios = require('axios');

exports.getBusinessDetail = (req, res)=>{
    const id = req.params['id'];
    const result = {};

    axios.get('https://api.yelp.com/v3/businesses/'+id, {
        headers: {"Authorization": "Bearer V1KYODRPenQG5LQesVBBilqeev1YozUcMP6tO52GixN1yy53yIey5DPoJf20L7iNlaBVMwbn2PfHGOF__F1nYJw4rPES9dwgLdfL4t4S1Fmc7EsbRazKJ0YQIy8xY3Yx"},
    })
    .then(function (response) {
        result['error'] = false;

        const final = {};
        final['id'] = response.data['id'];
        final['name'] = response.data['name'];
        if ('location' in response.data && 'display_address' in response.data['location']) {
            final['address'] = response.data['location']['display_address'].join(' ');
        } else {
            final['address'] = '';
        }

        if ('categories' in response.data) {
            final['categories'] = [];
            for (let each of response.data['categories']) final['categories'].push(each['title']);
        } else {
            final['categories'] = [];
        }
        if ('display_phone' in response.data) final['phone'] = response.data['display_phone'];
        else final['phone'] = '';

        if ('price' in response.data) final['price'] = response.data['price'];
        else final['price'] = '';

        if ('url' in response.data) final['url'] = response.data['url'];
        else final['url'] = '';

        if ('photos' in response.data) final['photos'] = response.data['photos'];
        else final['photos'] = [];

        if ('transactions' in response.data) final['transactions'] = response.data['transactions'];
        else final['transactions'] = [];

        if ('hours' in response.data && response.data['hours'].length>0 && 'is_open_now' in response.data['hours'][0]) {
            final['is_open_now'] = response.data['hours'][0]['is_open_now'] ? 1: 0;
        } else {
            final['is_open_now'] = 2;
        }

        final['coordinates'] = response.data['coordinates'];
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
