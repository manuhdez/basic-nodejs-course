const profile = require('./profile');
// Users list: alenaholligan, chalkers
// Grab the users from the console
const users = process.argv.slice(2);
users.forEach(profile.get);