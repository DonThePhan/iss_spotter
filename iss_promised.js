const request = require('request-promise-native');

const fetchMyIP = function() {
  return request('https://api.ipify.org?format=json');
};
const fetchCoordsByIP = function(body) {
  let ip = JSON.parse(body).ip;
  return request(`https://freegeoip.app/json/${ip}`);
};

const fetchISSFlyOverTimes = function(body) {
  let locInfo = JSON.parse(body);
  const latitude = locInfo.latitude;
  const longitude = locInfo.longitude;
  return request(`https://iss-pass.herokuapp.com/json/?lat=${latitude}&lon=${longitude}`);
};

const nextISSTimesForMyLocation = function() {
  return fetchMyIP()
    .then(/** callback function -> */ fetchCoordsByIP)
    .then(/** callback function -> */ fetchISSFlyOverTimes)
    .then(
      /** callback function -> */ (data) => {
        const { response } = JSON.parse(data);
        return response;
      }
    );
};

module.exports = { nextISSTimesForMyLocation };

// request('https://api.ipify.org?format=json')
//   .then((response) => {
//     const ip = JSON.parse(response).ip;
//     return ip;
//   })
//   .then((ip) => {
//     return request(`https://freegeoip.app/json/${ip}`);
//   })
//   .then((locationInfo) => {
//     const locationInfoObj = JSON.parse(locationInfo);
//     const coords = { latitude: locationInfoObj.latitude, longitude: locationInfoObj.longitude };
//     const passInfo = request(`https://iss-pass.herokuapp.com/json/?lat=${coords.latitude}&lon=${coords.longitude}`);
//     return passInfo
//   })
//   .then((passInfo) => {
//     const passes = JSON.parse(passInfo).response
//     return passes
//   });
