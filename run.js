#!/usr/bin/env node

require('babel/register');
var inc = require('./lib/include');

inc.exec().then(function(res) {
  console.log(res);
});
