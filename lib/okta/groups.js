'use strict'

var Api = require('./api')

function Groups (domain, token) {
  if (!(this instanceof Groups)) {
    return new Groups(domain, token)
  }

  Api.call(this, domain, token)
}

Groups.prototype = new Api()

Groups.prototype.addUser = function get (groupId, userId) {
  return this.PUT(`groups/${encodeURIComponent(groupId)}/users/${encodeURIComponent(userId)}`)
}

Groups.prototype.create = function create (name, description) {
  return this.POST(`groups`, {
    profile: {
      name,
      description
    }
  })
}

Groups.prototype.get = function get (groupId) {
  return this.GET(`groups/${encodeURIComponent(groupId)}`)
}

Groups.prototype.list = function list () {
  return this.GET(`groups`)
}

Groups.prototype.members = function members (groupId) {
  return this.GET(`groups/${encodeURIComponent(groupId)}/users`)
}

Groups.prototype.query = function query (q) {
  return this.GET(`groups?q=${encodeURIComponent(q)}`)
}

Groups.prototype.remove = function remove (groupId) {
  return this.DELETE(`groups/${encodeURIComponent(groupId)}`)
}

Groups.prototype.removeUser = function removeUser (groupId, userId) {
  return this.DELETE(`groups/${encodeURIComponent(groupId)}/users/${encodeURIComponent(userId)}`)
}

module.exports = Groups
