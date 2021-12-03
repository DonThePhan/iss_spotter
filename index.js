const { nextISSTimesForMyLocation } = require('./iss');

nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log("It didn't work!", error);
  }
  // success, print out the deets!
  printDates(passTimes);
});

const printDates = function(passTimes) {
  for (let pass of passTimes) {
    let time = new Date(pass.risetime);
    let duration = pass.duration;
    console.log(`Next pass at ${time} for ${duration} seconds!`);
  }
};
