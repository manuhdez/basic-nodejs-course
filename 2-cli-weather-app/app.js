const weather = require('./weather');

// Grab the users from the console
const cityRef = process.argv.slice(2);
weather.get(cityRef);