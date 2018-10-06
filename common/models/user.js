'use strict';

var request = require('request');

var accuweather = {
  baseUrl: 'http://dataservice.accuweather.com/locations/v1',
  key: 'HackPSU2018',
};

module.exports = function(User) {
  User.getLocationKey = function(lat, lng, cb) {
    request({
      method: 'GET',
      url: 'http://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=HackPSU2018&q=' + lat + '%2C' + lng,
    }, function(err, res, body) {
      body = JSON.parse(body);
      cb(null, {
        locationKey: body.Key,
      });
    });
  };

  User.remoteMethod(
        'getLocationKey', {
          accepts: [{
            arg: 'lat',
            type: 'number',
            required: true,
          },
          {
            arg: 'lng',
            type: 'number',
            required: true,
          }],
          returns: {
            arg: 'data',
            type: 'object',
            root: true,
          },
          http: {
            path: '/getLocationKey',
            verb: 'get',
          },
        }
      );
};
