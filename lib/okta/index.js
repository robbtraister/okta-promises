'use strict'

var Api = require('./api')
var Apps = require('./apps')
var Groups = require('./groups')
var Users = require('./users')

function Okta (domain, token) {
  if (!(this instanceof Okta)) {
    return new Okta(domain, token)
  }

  this.api = new Api(domain, token)
  this.apps = new Apps(domain, token)
  this.groups = new Groups(domain, token)
  this.users = new Users(domain, token)
}

module.exports = Okta
module.exports.Api = Api
module.exports.Apps = Apps
module.exports.Groups = Groups
module.exports.Users = Users
