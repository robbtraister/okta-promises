var Api = require('./api');


function Apps(domain, token) {
  if (!(this instanceof Apps)) {
    return new Apps(domain, token);
  }

  Api.call(this, domain, token);
}


Apps.prototype = new Api();

/*
Apps.prototype.createSAMLApp = function createSAMLApp(app) {

};
*/


Apps.prototype.addGroup = function addGroup(appId, groupId) {
  return this.PUT(`apps/${encodeURIComponent(appId)}/groups/${encodeURIComponent(groupId)}`);
};


Apps.prototype.get = function get(appId) {
  return this.GET(`apps/${encodeURIComponent(appId)}`);
};


Apps.prototype.list = function list() {
  return this.GET(`apps`);
};


Apps.prototype.removeGroup = function removeGroup(appId, groupId) {
  return this.DELETE(`apps/${encodeURIComponent(appId)}/groups/${encodeURIComponent(groupId)}`);
};


module.exports = Apps;
