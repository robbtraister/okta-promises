var Apps = require('./apps');
var Users = require('./users');


function Okta(domain, token) {
  if (!(this instanceof Okta)) {
    return new Okta(domain, token);
  }

  this.Apps = new Apps(domain, token);
  this.Users = new Users(domain, token);
}


module.exports = Okta;
module.exports.Apps = Apps;
module.exports.Users = Users;
