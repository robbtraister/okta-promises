var requestPromise = require('request-promise-native');

var debug = require('debug')('okta:api');


function Api(domain, token) {
  if (!(this instanceof Api)) {
    return new Api(domain, token);
  }

  if (!/\.okta(preview)?\.com$/.test(domain)) {
    domain += '.okta.com';
  }
  if (!/^https?:\/\//.test(domain)) {
    domain = 'https://' + domain;
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
    uri = `${this.domain}${endpoint}`;
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
    json: true,
    resolveWithFullResponse: true
  })
    .then(response => {
      if (method === 'GET') {
        var next = (response.headers.link || '').split(',')
          .map(link => link.trim())
          .filter(link => / rel="next"$/.test(link))
          .map(link => link.match(/<([^>]+)/)[1])
          .shift();

        if (next) {
          return this.request(method, next, body)
            .then(items => response.body.concat(items));
        }
      }

      return response.body;
    })
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
