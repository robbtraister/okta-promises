#!/usr/bin/env node

var Okta = require('..');


function resetPasswordUrl(domain, token, username) {
  var users = new Okta.Users(domain, token);

  return users.resetPasswordUrl(username);
}


if (module === require.main) {
  resetPasswordUrl.apply(null, process.argv.slice(2))
    .then(console.log)
    .catch(console.error);
}
