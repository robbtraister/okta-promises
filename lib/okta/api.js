var requestPromise = require('request-promise-native');

var debug = require('debug')('okta:api');


function Api(domain, token) {
  if (!(this instanceof Api)) {
    return new Api(domain, token);
  }

  this.domain = domain;
  this.token = token;
}


Api.prototype.request = function request(method, endpoint, body) {
  debug('method', method);
  debug('endpoint', endpoint);
  method = method || 'GET';

  var uri;
  if (/^[a-z]*:\/\//i.test(endpoint)) {
    uri = endpoint;
  } else {
    endpoint = endpoint.replace(/^\/*/, '').replace(/^(api\/v1\/)?/, 'api/v1/').replace(/^\/*/, '/');
    var domain = this.domain.replace(/(\.okta\.com)?$/, '.okta.com');
    uri = `https://${domain}${endpoint}`;
  }

  return requestPromise({
    method,
    uri,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `SSWS ${this.token}`
    },
    body,
    json: true
  });
};


Api.prototype.DELETE = function DELETE(endpoint) {
  return this.request('DELETE', endpoint);
};


Api.prototype.GET = function GET(endpoint) {
  return this.request('GET', endpoint);
};


Api.prototype.POST = function POST(endpoint, body) {
  return this.request('POST', endpoint, body);
};


Api.prototype.PUT = function PUT(endpoint, body) {
  return this.request('PUT', endpoint, body);
};


module.exports = Api;
