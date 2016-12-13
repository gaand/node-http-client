#!/usr/bin/env node
'use strict';

const http = require('http');
const url = require('url');

const ajax = function (config, success, failure) {

  const options = Object.assign({ method: config.method },
                                url.parse(config.url));

  if (config.data) {
    options.headers = {
      'Content-Type': 'application/json',
      'Content-Length': config.data.length,
    };
  }

  const request = http.request(options, (response) => {
    let data = '';
    response.setEncoding('utf8');
    response.on('error', failure);
    response.on('data', (chunk) => {
      data += chunk;
    });
    response.on('end', () => {
      success(data);
    });
  });

  request.on('error', failure);

  if (config.data) {
    request.write(config.data);
  }

  request.end();

};

module.exports = ajax;
