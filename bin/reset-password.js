#!/usr/bin/env node

var Okta = require('.');


function resetPassword(domain, token, username) {
  var users = new Okta.Users(domain, token);

  return users.resetPassword(username);
}


if (module === require.main) {
  resetPassword.apply(null, process.argv.slice(2))
    .then(console.log)
    .catch(console.error);
}
