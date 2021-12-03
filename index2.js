const { nextISSTimesForMyLocation } = require('./iss_promised');

const printDates = function(passTimes) {
  for (let pass of passTimes) {
    let time = new Date(pass.risetime);
    let duration = pass.duration;
    console.log(`Next pass at ${time} for ${duration} seconds!`);
  }
};
nextISSTimesForMyLocation().then((nextPasses) => {
  printDates(nextPasses);
}).catch(error => {
  console.log(`It didn't work: `, error.message)
})
