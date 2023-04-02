const NodeGeocoder = require('node-geocoder');

const options = {
  provider: process.env.GEOCODER_PROVIDER,
  httpAdapter: 'https',
  apiKey: process.env.GEOCODER_API_KEY,
  formatter: null,
  countryCode: 'PS',
  zipcode: '00000'
};

const geocoder = NodeGeocoder(options);

module.exports = geocoder;