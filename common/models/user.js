'use strict';

var request = require('request');

// Imports the Google Cloud client library
const language = require('@google-cloud/language');

// Instantiates a client
const client = new language.LanguageServiceClient({
    keyFilename: 'chatbot-64ab86bc6794.json'
});

// The text to analyze
const text = 'how is the weather on October 6th';

const document = {
  content: text,
  type: 'PLAIN_TEXT',
};

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

  User.getLocationKey = function(locationKey, cb) {
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

// 10days weather 
// Alerts https://developer.accuweather.com/accuweather-alerts-api/apis/get/alerts/v1/%7BlocationKey%7D
// Current Condition https://developer.accuweather.com/accuweather-current-conditions-api/apis/get/currentconditions/v1/%7BlocationKey%7D
// daily forecast https://developer.accuweather.com/accuweather-forecast-api/apis/get/forecasts/v1/daily/1day/%7BlocationKey%7D