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

Apps.prototype.get = function get(id) {
  return this.GET(`apps/${encodeURIComponent(id)}`);
};


Apps.prototype.list = function list() {
  return this.GET(`apps`);
};


module.exports = Apps;
