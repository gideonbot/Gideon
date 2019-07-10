const https = require('https');
const querystring = require('querystring');
const utils = require('./utils');

// @function request
// Uses the given options to form and make a request to the imgur API.
// @params
// options              an object containing various options to pass to
//                      the request
// options.clientID     a pre-generated imgur application client ID
// options.accessToken  a pre-generated imgur application access token,
//                      which, if given, will be used to form an
//                      authentication header
//                      (optional, default = null)
// options.path         a relative path to an imgur API endpoint,
//                      e.g. '/album/hlF1z'
// options.method       the desired HTTP method to use
//                      (optional, default = 'GET')
//                      e.g. GET, POST, PUT, DELETE
// options.data         a string or object or data to be sent as part
//                      of the API request. if an object is given, it
//                      will be stringified
//                      (optional, default = null)
// callback             the function called upon either a successful or
//                      failed API request
//                      e.g. (err, res) => {}
function request(options, callback) {
  if (error = handleErrors(options)) return callback(error);

  let args = {
    hostname: 'api.imgur.com',
    method: options.method || 'GET',
    path: [ '/3', utils.trim(options.path, '/', null) ].join('/'),
    headers: {}
  };

  if (options.clientID)
    args.headers['Authorization'] = `Client-ID ${options.clientID}`;

  if (options.accessToken)
    args.headers['Authorization'] = `Bearer ${options.accessToken}`;

  if (options.data) {
    options.data = querystring.stringify(options.data);
    args.headers['Content-Type'] = 'application/x-www-form-urlencoded';
    args.headers['Content-Length'] = options.data.length;
  }

  let req = https.request(args, (res) => {
    let data = '';
    res.on('data', (chunk) => data += chunk);
    res.on('end', () => {
      let response = parseResponse(res, data);
      if (res.statusCode === 200) callback(null, response);
      else callback(response);
    });
  });
  if (options.data) req.write(options.data);
  req.end();
  req.on('error', (err) => {
    return callback(err);
  });
}

function handleErrors(options) {
  if (!options)
    return new Error('options is required.');
  if (!options.clientID && !options.accessToken)
    return new Error('Must declare options.clientID or options.accessToken.');
  if (!options.path)
    return new Error('options.path cannot be empty.');

  // No errors were found, return null.
  return null;
}

function parseResponse(res, data) {
  let response = {};

  if (res.headers['content-type'] === 'application/json') {
    data = JSON.parse(data);
    if (data.data !== undefined) response = data.data;
    else response = data;
  } else {
    response.data = data;
  }

  response.headers = res.headers;

  return response;
}

module.exports = request;
