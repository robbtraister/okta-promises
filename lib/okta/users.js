'use strict'

var Api = require('./api')

function Users (domain, token) {
  if (!(this instanceof Users)) {
    return new Users(domain, token)
  }

  Api.call(this, domain, token)
}

Users.prototype = new Api()

Users.prototype.activate = function activate (user) {
  return this.getId(user)
    .then(id => this.POST(`users/${encodeURIComponent(id)}/lifecycle/activate`))
}

Users.prototype.assignRole = function assignRole (userIdOrLogin, type) {
  return this.getId(userIdOrLogin)
    .then(id => this.POST(`users/${encodeURIComponent(id)}/roles`, {type}))
}

Users.prototype.create = function create (firstName, lastName, email, login) {
  var profile = {
    firstName,
    lastName,
    email,
    login: login || email
  }
  return this.POST('users?activate=true', {profile})
}

Users.prototype.deactivate = function deactivate (user) {
  return this.getId(user)
    .then(id => this.POST(`users/${encodeURIComponent(id)}/lifecycle/deactivate`))
}

Users.prototype.get = function get (idOrLogin) {
  return this.GET(`users/${encodeURIComponent(idOrLogin)}`)
}

Users.prototype.getId = function getId (userIdOrLogin) {
  if (userIdOrLogin.id) {
    return Promise.resolve(userIdOrLogin.id)
  } else {
    return this.get(userIdOrLogin)
      .then(user => user.id)
  }
}

Users.prototype.list = function list () {
  return this.GET(`users`)
}

Users.prototype.query = function query (q) {
  return this.GET(`users?q=${encodeURIComponent(q)}`)
}

Users.prototype.resetPassword = function resetPassword (userIdOrLogin) {
  return this.getId(userIdOrLogin)
    .then(id => this.POST(`users/${id}/lifecycle/reset_password?sendEmail=true`))
}

Users.prototype.resetPasswordUrl = function resetPasswordUrl (userIdOrLogin) {
  return this.getId(userIdOrLogin)
    .then(id => this.POST(`users/${id}/lifecycle/reset_password?sendEmail=false`))
    .then(body => body.resetPasswordUrl)
}

Users.prototype.roles = function roles (userIdOrLogin) {
  return this.getId(userIdOrLogin)
    .then(id => this.GET(`users/${encodeURIComponent(id)}/roles`))
}

module.exports = Users
