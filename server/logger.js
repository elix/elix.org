'use strict';

let bunyan = require('bunyan');

function createLogger(loggerName) {
  return bunyan.createLogger({
    name: loggerName,
    streams: [
      {
        level: 'info',
        stream: process.stdout
      }
    ],
    serializers: {
      request: reqSerializer,
      response: resSerializer,
      error: bunyan.stdSerializers.err
    }
  });
}

function reqSerializer(request) {
  if (!request || !request.connection) {
    return request;
  }

  // More detail for debugging...
  // return {
  //   req_id: request.req_id,
  //   method: request.method,
  //   url: request.url,
  //   headers: request.headers,
  //   remoteAddress: request.connection.remoteAddress,
  //   remotePort: request.connection.remotePort
  // };
  return {
    url: request.url
  };
}

function resSerializer(response) {
  if (!response || !response.statusCode) {
    return response;
  }

  return {
    req_id: response.req.req_id,
    statusCode: response.statusCode,
    header: response._header
  };
}

module.exports = {
  logger: createLogger
};
