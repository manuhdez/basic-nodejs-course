// Require the https module
const https = require('https');
const api = require('./api.json');

// Save the API url
// http://api.openweathermap.org/data/2.5/weather?q=London,uk&appid=604e8540096d6ae0ff5d90598e12f508
const apiURL = 'https://api.openweathermap.org/data/2.5/weather?q=';

function printWeather(cityName, temp) {
  console.log(`The current temperature in ${cityName} is ${temp}F`);
}

// Make the https request
function getCityWeather(cityRef) {
  try {
    const request = https.get(`${apiURL}${cityRef}&appid=${api.key}` , response => {
      let body;
      // Read the data
      response.on('data', data => {
        body = data.toString();
      });
      response.on('end', () => {
        try {
          // Process the data
          const jsonResponse = JSON.parse(body);
          const cityName = jsonResponse.name;
          const temp = jsonResponse.main.temp;
          // Print the response to the user
          printWeather(cityName, temp);
        } catch (error) {
          printError(error);
        }
      })
    });
  } catch (error) {
    printError(error);
  }
}

function printError(error) {
  console.error(error);
}

module.exports.get = getCityWeather;