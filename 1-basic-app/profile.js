// Require https module
const https = require('https');

// Print error messages
function printError(error) {
  console.error(error.message);
}

// Prints a message to the console
function printMessage(username, badgeCount, points) {
  const message = `${username} has ${badgeCount} badge(s) and a total of ${points} points in Javascript`;
  console.log(message);
}

function getProfile(username) {
  try {
    // Connect to the API url ('http://teamtreehouse.com/username.json')
    const request = https.get(`https://teamtreehouse.com/${username}.json`, response => {
      let body = '';
      // Read the data
      response.on('data', data => {
        body += data.toString();
      });

      response.on('end', () => {
        try {
          // Parse the data
          let profile = JSON.parse(body);
          // Print the data
          printMessage(profile.profile_name, profile.badges.length, profile.points.JavaScript);
        } catch (error) {
          printError(error);
        }
      });

    });
    request.on('error', error => printError(error) );
  } catch (error) {
    printError(error);
  }
}

// Export the modules you want to be available in other scripts
module.exports.get = getProfile;